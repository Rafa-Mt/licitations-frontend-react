import { 
    createRouter, 
    createRootRoute,
    createRoute,
    useRouterState,
    Navigate,
    Outlet
} from "@tanstack/react-router"

import { checkAuthToken } from "./cookies"
import Login from "../views/Login";
import Register from "../views/Register";
import Main from "../views/Main";

const RootComponent = () => {
    const isAuthenticated = checkAuthToken();
    const { pathname } = useRouterState({
        select: (state) => state.location
    })

    if (!isAuthenticated && ["/login", "/register", "/"].includes(pathname))
        return <Navigate to="/login"></Navigate>

    if (isAuthenticated && pathname === '/login')
        return <Navigate to="/app"></Navigate>

    return <Outlet/>   
}

const rootRoute = createRootRoute({
    component: RootComponent
})

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: Login
})

const registerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/register",
    component: Register
})

const mainRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/app",
    component: Main
})

const routeTree = rootRoute.addChildren([loginRoute, registerRoute, mainRoute])
export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}