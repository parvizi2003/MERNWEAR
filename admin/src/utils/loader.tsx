import React, { Suspense } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { FullScreenLoader } from "@/components/shared";

export function Loader({ children }: { children: React.ReactNode }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div>
              There was an error!
              <button onClick={() => resetErrorBoundary()}>Try again</button>
            </div>
          )}
        >
          <Suspense fallback={<FullScreenLoader />}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
