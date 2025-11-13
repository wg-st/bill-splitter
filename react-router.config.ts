import type { Config } from "@react-router/dev/config";

export default {
  // Enable SPA mode for static deployment
  ssr: false,
  basename: process.env.GITHUB_PAGES === "true" ? "/bill-splitter" : "/",
} satisfies Config;
