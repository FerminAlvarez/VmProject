import json
from channels.generic.websocket import WebsocketConsumer
from ..ssh.websocket.remote_python_realtime import  execute_python_command, create_sandbox_environment, open_client
from ..auth.Auth import authenticated

class ConsumerPY(WebsocketConsumer):

    def connect(self):
        print('Connection established')
        try:
            token = self.__build_token()
        except Exception as e:
            self.close()
            return 
        
        if(authenticated(token)):
            self.accept()
            open_client()
            self.send(create_sandbox_environment())
        else:
            self.close()

    def disconnect(self, close_code):
        print('Disconnected')
        self.close(close_code)
    
    def send_response(self, response):
        self.send(response)

    def receive(self, text_data):
        print('Received Message')
        
        
        try:
            text_data_json = json.loads(text_data)
            python_command = text_data_json['command']
            
            if("exit" in python_command):
                self.send_response("Unexpected message")
                self.disconnect(4000)
                return
            
            for line in execute_python_command(python_command):
                self.send_response(line)
                
        except json.JSONDecodeError:
            self.send_response("Unexpected message")
            self.disconnect(4000)
            
    def __build_token(self):
        return self.scope.get("query_string").decode("utf-8").split("=")[1].replace("%20", " ")