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
    console.log('here')
    console.log(getUserType())
    return getUserType().then((type) => {
        console.log('tipo de usuario: ',type)
        const routeToRedirect = type === 'admin' ? "/app/admin" : "/app/user" 
        console.log('ruta a redirigir: ',routeToRedirect)
        console.log('Esta autenticado: ',isAuthenticated)
        console.log('Ruta actual: ',pathname)
        if (isAuthenticated && pathname === '/login')
            return <Navigate to={routeToRedirect}></Navigate>
    
        return <Outlet/>   
    })
}

export default RouterRoot