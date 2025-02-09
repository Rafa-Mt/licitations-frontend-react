import { getAuthToken, saveAuthToken, removeAuthToken } from "./cookies"
import { fetchWrapper } from "../utils/fetchWrapper"

interface LoginResponse {
    success: boolean;
    message?: string;
  }


export const getUserType = async () => {
    const token = getAuthToken()
    let payloadBase64;
    let payloadDecoded;
    if(!token){
      console.log('no token')
      return;
  }
    payloadBase64 = token?.split('.')[1]; 
    payloadDecoded = payloadBase64 ? JSON.parse(atob(payloadBase64)) : null;

    if(!payloadDecoded){
        console.log('no payload')
        return;
    }
    console.log(payloadDecoded)

    if(payloadDecoded.user_type === 1 ){
        return 'admin'
    }
    return 'user'
}



export const login = async ({ email, password }: { email: string; password: string }): Promise<LoginResponse | undefined> => {
  try {
    console.log(email, password)
    const response = await fetchWrapper.post({ endpoint: '/auth/login', data: { email, password } });
    const data = await response.json();
    if (response.ok) {
      saveAuthToken(data.token);
      return { success: true };
    }
    return { success: false, message: data.message };
  } catch (error) {
    console.error(error);
  }
};

export const register = async ({username, email, password}: {username: string, email: string, password: string}) => {
  try {
    const response = await fetchWrapper.post({ 
    endpoint: '/auth/register',
    data: {username, email, password}
     });
     const data = await response.json();
     console.log(data)
    if (response.ok) {
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    console.error(error);
  }
}

export const logout = async () => {
  try {
    const response = await fetchWrapper.post({ endpoint: '/auth/logout' });
    if (response.ok) {
      removeAuthToken();
      return {success: true}
    }
    return {success: false}
  } catch (error) {
    console.error(error); 
  }
}
