import paramiko
from django.conf import settings

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
        print(result)
        
        output  = build_output(result)
        return output
    except Exception as e:
        print("There was an error", e)
        return stderr


def build_output(result):
    output = [line.strip() for line in result.split("\n") if line.strip()]
    return output