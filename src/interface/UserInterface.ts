export interface UserSignIn{
    email?:string;
    username?:string;
    password:string;
}
export interface UserSingUp{
    username:string;
    email:string;
    password:string;
    confirmPassword:string;
}
export interface UserForgot{
    email:string;
}