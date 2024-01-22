import json
from channels.generic.websocket import WebsocketConsumer

class MyConsumer(WebsocketConsumer):

    def connect(self):
        print('Connection established')
        self.accept()

    def disconnect(self, close_code):
        print('Disconnected')
        pass

    def receive(self, text_data):
        print('Received Message')

        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        self.send(text_data=json.dumps({
            'message':message
        }))