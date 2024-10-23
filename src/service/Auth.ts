import { UserForgot, UserSignIn, UserSingUp } from "../interface/UserInterface";
import { apiAuth } from "./api";


const signUp = async (data: UserSingUp) => {
    const response = await apiAuth.post(`/public/users/register`, data);
    return response;
};

const signIn = async (data: UserSignIn) => {
    const response = await apiAuth.post(`public/auth`, data);
    return response;
};

const forgot = async (data: UserForgot) => {
    const response = await apiAuth.post(`/forgot`, data);
    return response;
};

export{
    signUp,
    signIn,
    forgot
};