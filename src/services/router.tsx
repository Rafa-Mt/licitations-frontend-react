import { 
    createRouter, 
    createRootRoute,
    createRoute,
} from "@tanstack/react-router"

import Login from "../views/Login";
import Register from "../views/Register";
import MainUser from "../views/MainUser";
import MainAdmin from "../views/MainAdmin"
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

const mainUserRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/app/user",
    component: MainUser
})

const mainAdminRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/app/admin",
    component: MainAdmin
})



const routeTree = rootRoute.addChildren([loginRoute, registerRoute, mainUserRoute, mainAdminRoute])
export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}