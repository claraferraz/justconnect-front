import {Route, Routes} from 'react-router-dom';
import { Login } from '../pages/User/Login';
import { Register } from '../pages/User/Register';
import { ForgotPassword } from '../pages/User/Forgot';

export function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
            

        </Routes>
   );
}