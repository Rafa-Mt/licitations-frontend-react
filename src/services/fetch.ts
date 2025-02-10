import { getAuthToken, saveAuthToken, removeAuthToken, getTokenPayload } from "./cookies"
import { fetchWrapper } from "../utils/fetchWrapper"

interface LoginResponse {
    success: boolean;
    message?: string;
  }


export const getUserType = async () => {
    const token = getAuthToken()

    if(!token){
        console.log('No token')
        return;
    }

    const payloadDecoded = getTokenPayload({token})

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

export const getApplicationsUser = async () =>{
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No token found');
    }
    const payloadDecoded = getTokenPayload({ token });
    const id = payloadDecoded.id_user;
    const response = await fetchWrapper.get({endpoint: `/application/user/${id}`});
    const data = await response.json();
    console.log(data)
    return data.application;
  } catch (error) {
    console.error(error);
  }
}

export const getApplicationsAdmin = async () =>{
  try {
    const response = await fetchWrapper.get({endpoint: '/application/admin'});
    const data = await response.json();
    console.log(data.applications)
    return data.applications
  } catch (error) {
    console.error(error);
  }
}

export const updateApplication = async ({id, id_state}: {id: number, id_state: number}) => {
  try {
    console.log(id, id_state)
    const response = await fetchWrapper.put({endpoint: `/application/update/${id}`, data: {id_state}});
    const data = await response.json();
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
  }
}