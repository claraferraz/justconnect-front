import { UserForgot, UserSignIn, UserSingUp, UserResponse } from "../interface/UserInterface";
import { apiAuth } from "./api";

const signUp = async (data: UserSingUp) => {
    const response = await apiAuth.post(`/public/users/register`, data);
    return response;
};

const signIn = async (data: UserSignIn) => {
    const response = await apiAuth.post(`/public/auth`, data);
    return response;
};

const forgot = async (data: UserForgot) => {
    const response = await apiAuth.post(`/forgot`, data);
    return response;
};

const fetchUserData = async (): Promise<UserResponse> => {
    const id = localStorage.getItem('id');

    if (!id) {
        throw new Error('ID não foi encontrado'); 
    }
    const response = await apiAuth.get<UserResponse>(`/public/users/${id}`);
    
    return response.data; 
};


export {
    signUp,
    signIn,
    forgot,
    fetchUserData
};
