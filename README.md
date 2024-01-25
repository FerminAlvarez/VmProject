# Project: Project VM
# HTTP End-points
## End-point: Authenticate
This endpoint facilitates user authorization through Basic Authentication and returns an authentication token upon successful validation of credentials
### Method: GET
>```
>http://localhost:8000/auth
>```
### 🔑 Authentication basic

|Param|value|Type|
|---|---|---|
|Username|usernameExample|string|
|Password|passwordExample|string|




⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Authenticated Endpoint For Test
An authenticated endpoint designed for testing purposes, requiring a Bearer Token in the request header for access validation. This ensures that only authorized users with a valid token can interact with this testing resource
### Method: GET
>```
>http://localhost:8000/hello/
>```
### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|yourtoken|string|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Execute Command VM
An endpoint for running commands on a non-persistent virtual machine. Requires a Bearer Token in the request header for authentication and security. Use this endpoint to execute specific commands or scripts on the virtual machine without persistence.
### Method: POST
>```
>http://localhost:8000/execute-command-vm
>```
### Body (**raw**)

```json
{
    "command":"pwd"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|yourtoken|string|

### Response: 
```json
{
    "output": [
        "/home/vm"
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Execute Command Python
Executes Python commands or scripts on the virtual machine. Utilize this endpoint to run Python commands. Authentication is required using a Bearer Token provided in the request header for secure access.
### Method: POST
>```
>http://localhost:8000/execute-command-python
>```
### Body (**raw**)

```json
{
    "command": "print(7+2)"
}
```

### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|yourtoken|string|

### Response:
```json
{
    "output": [
        "9"
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Execute Python File
Allows the upload of a Python file for execution on the virtual machine. Submit a Python script file via a POST request, and the endpoint will execute the script, providing the result as a response. Authentication is required with a Bearer Token in the request header for secure access. Use this endpoint for sending Python scripts, executing them, and retrieving the output.
### Method: POST
>```
>http://localhost:8000/file-python
>```
### Body formdata

|Param|value|Type|
|---|---|---|
|file|/C:/archivo.py|file|


### 🔑 Authentication bearer

|Param|value|Type|
|---|---|---|
|token|yourtoken|string|

### Response: 
```json
{
    "output": [
        "9"
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Google Cloud Function - Execute Python File
Facilitates testing of a Google Cloud Function. Upload a script or code snippet to execute on the function and retrieve the result. Submit the content via a POST request, and authentication is required with a Bearer Token in the request header for secure access. This endpoint is designed for testing and experimenting with Google Cloud Functions.
### Method: POST
>```
>https://us-central1-vmproject-411814.cloudfunctions.net/ExecutePythonCode
>```
### Response: 
```json
{
    "output": [
        "A",
        "2",
        "3",
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# Websockets
## Execute VM Commands
This WebSocket facilitates the execution of commands on a persistent virtual machine and retreive messages in real-time. To ensure authentication and security, a Bearer Token must be included in the url. Utilize this websocket to run specific commands or scripts on the virtual machine with persistence.


>```
>ws://localhost:8000/vm/?token=Bearer token
>```

### Connected Response
```
Linux vmproject 5.10.0-27-cloud-amd64 #1 SMP Debian 5.10.205-2 (2023-12-31) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Thu Jan 25 21:24:14 2024 from 181.197.251.115

vm@vmproject:~$ 
```
### Send message

```
{
    "command":"pwd"
}
```

### Response: 
```
pwd
```
```
/home/vm
vm@vmproject:~$ 
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
## Execute Python Commands
This WebSocket is designed for executing python commands on a persistent virtual machine and retreive messages in real-time. Authentication and security are maintained by including a Bearer Token in the URL. Employ this WebSocket to execute specific Python commands or scripts on the virtual machine with persistence.


>```
>ws://localhost:8000/python/?token=Bearer token
>```

### Connected Response
```
>>>
```
### Send message

```
{
    "command":"print('A')"
}
```

### Response: 
```
print('A')
```
```
A
>>> 
```



_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
