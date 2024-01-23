import json
from channels.generic.websocket import WebsocketConsumer
from .ssh.remote_vm_realtime import  execute_vm_command, get_welcome_message
from .auth.Auth import authenticated

class MyConsumer(WebsocketConsumer):

    def connect(self):
        print('Connection established')
        if(authenticated(self.__build_token())):
            self.accept()
            self.send(get_welcome_message())
        else:
            self.close()

    def disconnect(self, close_code):
        print('Disconnected')
        self.close()
    
    def send_response(self, response):
        self.send(response)

    def receive(self, text_data):
        print('Received Message')

        text_data_json = json.loads(text_data)
        command = text_data_json['command']
        
        for line in execute_vm_command(command):
            self.send_response(line)
            
    def __build_token(self):
        return self.scope.get("query_string").decode("utf-8").split("=")[1].replace("%20", " ")