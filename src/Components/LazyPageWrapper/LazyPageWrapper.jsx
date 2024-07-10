import React, { Suspense } from "react";
import { CircularProgress } from "@chakra-ui/react";
export const LazyPageWrapper = ({ children }) => {
  return (
    <Suspense
      fallback={
        <CircularProgress
          pos="fixed"
          top="50%"
          left="50%"
          sx={{
            translate: "-50% -50%",
          }}
          isIndeterminate
        />
      }
    >
      {children}
    </Suspense>
  );
};
