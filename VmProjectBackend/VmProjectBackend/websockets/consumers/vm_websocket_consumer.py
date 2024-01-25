import json
from channels.generic.websocket import WebsocketConsumer
from ..services.vm_ssh_service import (
    execute_vm_command,
    get_welcome_message,
    open_client,
)
from ...auth.auth import authenticated
import logging

logger = logging.getLogger(__name__)


class ConsumerVM(WebsocketConsumer):
    def connect(self):
        logger.info("Connection established")
        try:
            token = self.__build_token()
        except Exception as e:
            self.close()
            return

        if authenticated(token):
            logger.info("Authenticated")
            self.accept()
            open_client()
            self.send(get_welcome_message())
        else:
            logger.info("Unauthorized")
            self.close()

    def disconnect(self, close_code):
        logger.info("Disconnected")
        self.close(close_code)

    def send_response(self, response):
        self.send(response)
        logger.info(f"Sending response: {response}")

    def receive(self, text_data):
        logger.info("Received Message")

        try:
            text_data_json = json.loads(text_data)
            command = text_data_json["command"]
            logger.info(f"Command: {command}")
            for line in execute_vm_command(command):
                self.send_response(line)

        except json.JSONDecodeError:
            self.send_response("Unexpected message")
            logger.info(f"Unexpected message: {text_data}")
            self.disconnect(4000)

    def __build_token(self):
        return (
            self.scope.get("query_string")
            .decode("utf-8")
            .split("=")[1]
            .replace("%20", " ")
        )
