import { UserForgot, UserSignIn, UserSingUp } from "../interface/UserInterface";
import { apiAuth } from "./api";

const baseURL = '/user';

const signUp = async (data: UserSingUp) => {
    const response = await apiAuth.post(`${baseURL}/signup`, data);
    return response;
};

const signIn = async (data: UserSignIn) => {
    const response = await apiAuth.post(`${baseURL}/signin`, data);
    return response;
};

const forgot = async (data: UserForgot) => {
    const response = await apiAuth.post(`${baseURL}/forgot`, data);
    return response;
};

export{
    signUp,
    signIn,
    forgot
};