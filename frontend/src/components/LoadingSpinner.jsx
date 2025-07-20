import React from "react";

const LoadingSpinner = () => (
  <div className="h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-yellow-500"></div>
  </div>
);

export default LoadingSpinner;