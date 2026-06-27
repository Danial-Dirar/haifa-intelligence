import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Monorepo: deps are hoisted to the workspace root, so point Turbopack
  // there explicitly (silences the "inferred workspace root" warning).
  turbopack: {
    root: path.join(__dirname, "..", ".."),
  },
};

export default nextConfig;
