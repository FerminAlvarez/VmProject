from keycloak import KeycloakOpenID
from keycloak.exceptions import KeycloakAuthenticationError
from django.conf import settings
import base64
import logging

logger = logging.getLogger(__name__)

keycloak_openid = KeycloakOpenID(
    server_url=settings.KEYCLOAK_SERVER_URL,
    realm_name=settings.KEYCLOAK_REALM,
    client_id=settings.KEYCLOAK_CLIENT_ID,
    client_secret_key=settings.KEYCLOAK_CLIENT_SECRET,
)

BEARER_PREFIX = "Bearer "
BASIC_PREFIX = "Basic "


def authenticated(header):
    try:
        if contains_bearer_token(header):
            token = get_bearer_token(header)
            keycloak_openid.userinfo(token)
            return True
        else:
            return False
    except KeycloakAuthenticationError as e:
        logger.error(f"Authentication error: {e}")
        return False


def contains_bearer_token(header):
    return header and header.startswith(BEARER_PREFIX)


def get_bearer_token(header):
    return header.split(" ")[1]


def get_access_token(header):
    try:
        if contains_basic_credentials(header):
            username, password = get_basic_credentials(header)

            token_info = keycloak_openid.token(username=username, password=password)

            access_token = token_info.get("access_token")

            return access_token
    except Exception as e:
        logger.error(f"Error while retrieving access token: {e}")


def contains_basic_credentials(header):
    return header and header.startswith(BASIC_PREFIX)


def get_basic_credentials(header):
    credentials_base64 = header.split(" ")[1]
    credentials_bytes = base64.b64decode(credentials_base64)
    credentials = credentials_bytes.decode("utf-8")

    username, password = credentials.split(":")
    return username, password
