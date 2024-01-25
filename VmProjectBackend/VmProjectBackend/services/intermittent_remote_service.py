import paramiko
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

VMHOST = settings.VMHOST
VMUSER = settings.VMUSER
VMPASSWORD = settings.VMPASSWORD
VMPRIVATE_KEY_PATH = settings.VMPRIVATE_KEY_PATH

DOCKER_COMMAND = "sudo docker run -i --rm python-sandbox python -c"


def open_connection():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy)
    private_key = paramiko.RSAKey(filename=VMPRIVATE_KEY_PATH, password=VMPASSWORD)
    client.connect(VMHOST, username=VMUSER, pkey=private_key)
    return client


def execute_vm_command(command):
    try:
        client = open_connection()
        stdin, stdout, stderr = client.exec_command(command)
        result = stdout.read().decode()

        output = build_output(result)
        logger.info(f"Output {output}")
        return output
    except Exception as e:
        logger.error(f"There was an error: {e}")
        return stderr


def execute_python_command(command):
    try:
        client = open_connection()
        docker_command = f'{DOCKER_COMMAND} "{command}"'
        stdin, stdout, stderr = client.exec_command(docker_command, get_pty=True)
        result = stdout.read().decode()

        output = build_output(result)
        logger.info(f"Output {output}")
        return output
    except Exception as e:
        logger.error(f"There was an error: {e}")
        return stderr


def build_output(result):
    output = [line.strip() for line in result.split("\n") if line.strip()]
    return output
