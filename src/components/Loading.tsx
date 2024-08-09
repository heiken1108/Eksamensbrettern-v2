"use client";
import React, { useState, useEffect } from "react";

interface LoadingProps {
  message: string;
}

/**
 * Component for displaying a loading animation.
 * @param message - The message to be displayed while loading.
 * @component
 */
const Loading: React.FC<LoadingProps> = ({ message }) => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      switch (dots) {
        case ".":
          setDots("..");
          break;
        case "..":
          setDots("...");
          break;
        case "...":
          setDots(".");
          break;
        default:
          setDots(".");
          break;
      }
    }, 300);

    return () => clearInterval(interval);
  }, [dots]);

  return (
    <div className="flex justify-center items-center h-full w-full">
      <h1>
        {message}
        {dots}
      </h1>
    </div>
  );
};

export default Loading;
