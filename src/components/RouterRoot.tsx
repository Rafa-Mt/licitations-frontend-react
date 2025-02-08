import {
    useRouterState,
    Navigate,
    Outlet
} from '@tanstack/react-router'

import { checkAuthToken } from '../services/cookies';

const RouterRoot = () => {
    const isAuthenticated = checkAuthToken();
    const { pathname } = useRouterState({
        select: (state) => state.location
    })
    console.log({isAuthenticated, pathname})

    if (!isAuthenticated && !["/login", "/register", "/"].includes(pathname))
        return <Navigate to="/login"></Navigate>

    if (isAuthenticated && pathname === '/login')
        return <Navigate to="/app"></Navigate>

    return <Outlet/>   
}

export default RouterRoot