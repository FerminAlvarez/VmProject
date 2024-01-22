from keycloak import KeycloakOpenID
from keycloak.exceptions import KeycloakAuthenticationError
from django.conf import settings
import base64

keycloak_openid = KeycloakOpenID(server_url=settings.KEYCLOAK_SERVER_URL,
                                realm_name=settings.KEYCLOAK_REALM,
                                client_id=settings.KEYCLOAK_CLIENT_ID,
                                client_secret_key=settings.KEYCLOAK_CLIENT_SECRET)

def authenticated(authorization_header):
    try:
        if authorization_header and authorization_header.startswith('Bearer '):
            token = authorization_header.split(' ')[1]
            keycloak_openid.userinfo(token)
            return True
        else:
            return False
    except KeycloakAuthenticationError as e: 
            print(e)
            return False
    
def get_access_token(authorization_header):
    try:
        if authorization_header and authorization_header.startswith('Basic '):
            credentials_base64 = authorization_header.split(' ')[1]
            credentials_bytes = base64.b64decode(credentials_base64)
            credentials = credentials_bytes.decode('utf-8')

            username, password = credentials.split(':')

            token_info = keycloak_openid.token(username=username, password=password)

            access_token = token_info.get('access_token')

            return access_token
    except Exception as e:
        print(e)
    
