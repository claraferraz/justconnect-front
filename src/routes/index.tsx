import {Route, Routes} from 'react-router-dom';
import { Login } from '../pages/User/Login';
// import { Register } from '../pages/Register';

export function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={<Login/>}/>
            {/* <Route path='/register' element={<Register/>}/> */}

        </Routes>
   );
}