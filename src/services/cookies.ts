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