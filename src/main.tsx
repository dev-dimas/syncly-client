import { createRoot } from "react-dom/client";
import "@/globals.css";
import { Routes } from "@generouted/react-router";
import { HelmetProvider } from "react-helmet-async";
import { NuqsAdapter } from "nuqs/adapters/react";

const helmetContext = {};

createRoot(document.getElementById("root")!).render(
  <HelmetProvider context={helmetContext}>
    <NuqsAdapter>
      <Routes />
    </NuqsAdapter>
  </HelmetProvider>
);
