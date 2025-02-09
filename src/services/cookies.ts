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
    const sessionToken = Cookies.get('session_token');
    let payloadBase64;
    let payloadDecoded;
    if(sessionToken){
        payloadBase64 = sessionToken?.split('.')[1]; 
        payloadDecoded = payloadBase64 ? JSON.parse(atob(payloadBase64)) : null;
    }
    console.log(sessionToken)
    console.log(payloadBase64)
    console.log(payloadDecoded)
    Cookies.remove('session_token');
  };