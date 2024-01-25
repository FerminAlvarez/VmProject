from django.conf import settings
import requests
import logging
import json

logger = logging.getLogger(__name__)

URL_CLOUD_FUNCTIONS = settings.URL_CLOUD_FUNCTIONS


def execute_python_file(file):
    try:
        file_content = file.read()

        headers = {"Content-Type": "application/octet-stream"}

        response = requests.post(
            url=URL_CLOUD_FUNCTIONS,
            headers=headers,
            data=file_content,
        )

        logger.info(f"Google cloud functions response: {response.text}")

        output_json = json.loads(response.text)
        clean_output = output_json.get("output", [])

        return clean_output

        return output_json
    except Exception as e:
        logger.error(f"There was an error executing python file: {e}")
