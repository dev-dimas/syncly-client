import "@/globals.css";
import { Routes } from "@generouted/react-router";
import { NuqsAdapter } from "nuqs/adapters/react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./app/store";

const helmetContext = {};

createRoot(document.getElementById("root")!).render(
  <HelmetProvider context={helmetContext}>
    <ReduxProvider store={store}>
      <NuqsAdapter>
        <Routes />
      </NuqsAdapter>
    </ReduxProvider>
  </HelmetProvider>
);
