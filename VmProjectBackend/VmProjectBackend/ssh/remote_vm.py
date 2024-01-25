import paramiko
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

VMHOST=settings.VMHOST
VMUSER=settings.VMUSER
VMPASSWORD=settings.VMPASSWORD
VMPRIVATE_KEY_PATH=settings.VMPRIVATE_KEY_PATH

def execute_vm_command(command): 
    try:
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy)
        private_key = paramiko.RSAKey(filename=VMPRIVATE_KEY_PATH, password=VMPASSWORD)
        client.connect(VMHOST, username=VMUSER, pkey=private_key)
        stdin, stdout, stderr = client.exec_command(command)
        result = stdout.read().decode()
        logger.info(f"Output {result}")
                
        output  = build_output(result)
        return output
    except Exception as e:
        logger.error(f"There was an error: {e}")
        return stderr

def execute_python_command(command): 
    try:
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy)
        private_key = paramiko.RSAKey(filename=VMPRIVATE_KEY_PATH, password=VMPASSWORD)
        client.connect(VMHOST, username=VMUSER, pkey=private_key)
        
        docker_command = f'sudo docker run -i --rm python-sandbox python -c "{command}"'

        stdin, stdout, stderr = client.exec_command(docker_command)
        result = stdout.read().decode()
        logger.info(result)
        
        output  = build_output(result)
        return output
    except Exception as e:
        logger.error(f"There was an error: {e}")
        return stderr


def build_output(result):
    output = [line.strip() for line in result.split("\n") if line.strip()]
    return output