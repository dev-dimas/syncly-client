import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Outlet />
      <Toaster
        position="top-center"
        theme="light"
        duration={3000}
        closeButton
        richColors
      />
    </>
  );
}
