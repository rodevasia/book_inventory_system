import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex justify-center gap-2 bg-[var(--persian-orange)] min-h-[10vh]">
        <h1 className="font-bold text-2xl text-center self-center">
          Book Inventory System
        </h1>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
      <ToastContainer />
    </>
  ),
});
