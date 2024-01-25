from django.conf import settings
import re
import paramiko
import logging

logger = logging.getLogger(__name__)


VMHOST=settings.VMHOST
VMUSER=settings.VMUSER
VMPASSWORD=settings.VMPASSWORD
VMPRIVATE_KEY_PATH=settings.VMPRIVATE_KEY_PATH

BUFFER_SIZE = 4096

EXPECTED_TERMINATING_LINE = ">>>"

channel = None

def open_client():
    global channel
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy)
    private_key = paramiko.RSAKey(filename=VMPRIVATE_KEY_PATH, password=VMPASSWORD)
    client.connect(VMHOST, username=VMUSER, pkey=private_key)
    channel = client.invoke_shell()
    channel.settimeout(5)
    channel.send("sudo docker run -it python-sandbox"+ '\n')

def execute_python_command( command):
        logger.info(f"Execute command: {command}")
        try:
            channel.send(command + '\n')
            
            yield from __get_all_lines()
                
        except TimeoutError as e:
            logger.error("The operation timed out")
            yield ("The operation timed out :(")
            
        except Exception as e:
            logger.error(f"There was an error: {e}")
            return str(e)


def build_output(result):
    output = [line.strip() for line in result.split("\n") if line.strip()]
    return output

def decode( text):
    decoded_output = text.decode('utf-8')
    ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')
    return  ansi_escape.sub('', decoded_output)

def __get_all_lines():
    while True:
        out = channel.recv(BUFFER_SIZE)
        cleaned_output = decode(out)
        yield cleaned_output
        
        if EXPECTED_TERMINATING_LINE in cleaned_output:
            channel.send("exit()" + '\n')
            break
        
def create_sandbox_environment():
    cleaned_output = ''
    while True:
        out = channel.recv(BUFFER_SIZE)
        cleaned_output = decode(out)
        logger.info(cleaned_output)
        
        if EXPECTED_TERMINATING_LINE in cleaned_output:
            return cleaned_output
            