import {
    useRouterState,
    Navigate,
    Outlet
} from '@tanstack/react-router'

import { checkAuthToken } from '../services/cookies';
import { getUserType } from '../services/fetch';

const RouterRoot = () => {
    const isAuthenticated = checkAuthToken();
    const { pathname } = useRouterState({
        select: (state) => state.location
    })
    console.log({isAuthenticated, pathname})

    if (!isAuthenticated && !["/login", "/register", "/"].includes(pathname))
        return <Navigate to="/login"></Navigate>

    return getUserType().then((type) => {
        const routeToRedirect = type === 'user' ? "/app/user" : "/app/admin" 
        if (isAuthenticated && pathname === '/login')
            return <Navigate to={routeToRedirect}></Navigate>
    
        return <Outlet/>   
    })
}

export default RouterRoot