import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HomepageProvider } from "../context/HomepageContext";
export const Route = createRootRoute({
  component: () => (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
      <HomepageProvider>
        <Outlet />
        <TanStackRouterDevtools />
        <ToastContainer theme="colored" />
      </HomepageProvider>
    </GoogleOAuthProvider>
  ),
});
