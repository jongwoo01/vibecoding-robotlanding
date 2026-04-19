"use client";

import { SplineScene } from "@/components/ui/splite";

export function RobotOnly() {
  return (
    <div className="h-[500px] w-full max-w-5xl bg-white">
      <SplineScene
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="h-full w-full"
      />
    </div>
  );
}
