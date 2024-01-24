import json
from channels.generic.websocket import WebsocketConsumer
from ..ssh.websocket.remote_vm_realtime import  execute_vm_command, get_welcome_message, open_client
from ..auth.Auth import authenticated

class ConsumerVM(WebsocketConsumer):

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
            self.send(get_welcome_message())
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
            command = text_data_json['command']
            for line in execute_vm_command(command):
                self.send_response(line)
                
        except json.JSONDecodeError:
            self.send_response("Unexpected message")
            self.disconnect(4000)
            
    def __build_token(self):
        return self.scope.get("query_string").decode("utf-8").split("=")[1].replace("%20", " ")