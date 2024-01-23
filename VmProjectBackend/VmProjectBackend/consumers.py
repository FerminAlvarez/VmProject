import json
from channels.generic.websocket import WebsocketConsumer
from .ssh.remote_vm_realtime import  execute_vm_command, decode, get_welcome_message

class MyConsumer(WebsocketConsumer):

    def connect(self):
        print('Connection established')
        self.accept()
        self.send(get_welcome_message())

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