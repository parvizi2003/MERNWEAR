import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ThemeProvider } from "./theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/query-client";
import { Loader } from "./utils";
const loader = document.getElementById("boot-loader");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Loader>
          <RouterProvider router={router} />
        </Loader>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);

loader?.remove();
