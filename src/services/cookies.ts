import Cookies from "js-cookie";

export const checkAuthToken = (): boolean => {
    const sessionToken = Cookies.get('session_token');
    return Boolean(sessionToken);
}

export const saveAuthToken = (token: string) => {
    Cookies.set('session_token', token)
}

export const getAuthToken = () => {
    return Cookies.get('session_token')
}

export const removeAuthToken = () => {
    Cookies.remove('session_token');
  };

export const getTokenPayload = ({token}: {token : string}) => {
    const payloadBase64 = token.split('.')[1];
    const payloadDecoded = payloadBase64 ? JSON.parse(atob(payloadBase64)) : null;
    return payloadDecoded;
}