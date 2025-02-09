import { getAuthToken, saveAuthToken } from "./cookies"
import { fetchWrapper } from "../utils/fetchWrapper"

interface LoginResponse {
    success: boolean;
    message?: string;
  }


export const getUserType = async () => {
    // TODO
    return 'user'
}



export const login = async ({ email, password }: { email: string; password: string }): Promise<LoginResponse | undefined> => {
  try {
    const response = await fetchWrapper.post({ endpoint: '/login', data: { email, password } });
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

export const register = async () => {
    const token = ""
    saveAuthToken(token)
}
