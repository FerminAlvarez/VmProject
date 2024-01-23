from django.conf import settings
import time
import re
import paramiko

VMHOST=settings.VMHOST
VMUSER=settings.VMUSER
VMPASSWORD=settings.VMPASSWORD
VMPRIVATE_KEY_PATH=settings.VMPRIVATE_KEY_PATH

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy)
private_key = paramiko.RSAKey(filename=VMPRIVATE_KEY_PATH, password=VMPASSWORD)
client.connect(VMHOST, username=VMUSER, pkey=private_key)
channel = client.invoke_shell()

def execute_vm_command( command):
        print(command)
        try:
            channel.send(command + '\n')
            
            while not channel.recv_ready():
                time.sleep(0.1)
                
            out = channel.recv(99999)
            cleaned_output = decode(out)
            
            return cleaned_output
        except Exception as e:
            print("There was an error", e)
            return str(e)


def build_output(result):
    output = [line.strip() for line in result.split("\n") if line.strip()]
    return output

def decode( text):
    decoded_output = text.decode('utf-8')
    ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')
    return  ansi_escape.sub('', decoded_output)