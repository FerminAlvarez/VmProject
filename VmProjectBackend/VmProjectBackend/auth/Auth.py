from keycloak import KeycloakOpenID
from keycloak.exceptions import KeycloakAuthenticationError
from django.conf import settings

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