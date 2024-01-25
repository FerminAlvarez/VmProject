# Project: Project VM

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

### Response: undefined
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

### Response: undefined
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

### Response: undefined
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
### Response: undefined
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
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
