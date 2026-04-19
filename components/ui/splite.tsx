"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <SplineFallback message="Loading 3D scene..." />
  ),
});

interface SplineSceneProps {
  scene: string;
  className?: string;
}

const subscribe = () => () => {};

function supportsWebGL() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2", { powerPreference: "high-performance" }) ??
      canvas.getContext("webgl", { powerPreference: "high-performance" }) ??
      canvas.getContext("experimental-webgl");

    if (!context) {
      return false;
    }

    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

function SplineFallback({
  className,
  message = "3D preview unavailable.",
}: {
  className?: string;
  message?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center overflow-hidden rounded-[inherit] border border-slate-200/70 bg-[radial-gradient(circle_at_top,rgba(226,232,240,0.8),rgba(255,255,255,0.96))] px-6 text-center text-sm text-slate-500",
        className
      )}
    >
      <div className="max-w-xs space-y-2">
        <p className="font-medium text-slate-700">3D scene unavailable</p>
        <p>{message}</p>
      </div>
    </div>
  );
}

class SplineErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallback: React.ReactNode }>,
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Spline scene failed to render.", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const canRender = React.useSyncExternalStore(
    subscribe,
    supportsWebGL,
    () => null
  );

  if (canRender === null) {
    return <SplineFallback className={className} message="Checking 3D support..." />;
  }

  if (!canRender) {
    return (
      <SplineFallback
        className={className}
        message="This browser or environment cannot create a WebGL context."
      />
    );
  }

  return (
    <SplineErrorBoundary
      fallback={
        <SplineFallback
          className={className}
          message="The 3D renderer failed to initialize, so a static fallback is shown instead."
        />
      }
    >
      <Spline scene={scene} className={className} />
    </SplineErrorBoundary>
  );
}
