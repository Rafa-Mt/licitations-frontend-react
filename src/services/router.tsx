import { 
    createRouter, 
    createRootRoute,
    createRoute,
} from "@tanstack/react-router"

import Login from "../views/Login";
import Register from "../views/Register";
import Main from "../views/Main";
import RouterRoot from "../components/RouterRoot";

const rootRoute = createRootRoute({
    component: RouterRoot
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