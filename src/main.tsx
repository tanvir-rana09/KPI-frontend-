import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
    Home,
    Dashboard,
    Login,
    Notice,
    Photos,
    Students,
    About,
    Signup,
    Administrators,
} from "./pages/index.ts";
import {Administrators as AdminComponents} from "./pages/admin/components/Administrators.tsx";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { AdminRoute, Auth, ProtectedRoute } from "./middleware/Auth.tsx";
import { Aside } from "./components/Index.ts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/students/:semester",
                element: <Students />,
            },
            {
                path: "/photos",
                element: <Photos />,
            },
            {
                path: "/notice",
                element: <Notice />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/administrators/:employee",
                element: <Administrators />,
            },
            {
                path: "/login",
                element: (
                    <Auth>
                        <Login />
                    </Auth>
                ),
            },
            {
                path: "/signup",
                element: (
                    <Auth>
                        <Signup />
                    </Auth>
                ),
            },
            {
                path: "/dashboard",
                element: (
                    <AdminRoute>
                        <Dashboard />
                    </AdminRoute>
                ),
                children: [
                    {
                        path: "/dashboard/administrators",
                        element: (
                            <ProtectedRoute>
                                <AdminComponents/>
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "/dashboard/students",
                        element: (
                            <ProtectedRoute>
                                <Aside />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "/dashboard/photos",
                        element: (
                            <ProtectedRoute>
                                <Aside />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "/dashboard/notice",
                        element: (
                            <ProtectedRoute>
                                <Aside />
                            </ProtectedRoute>
                        ),
                    },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
