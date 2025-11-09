import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/upload.tsx"),
  route("bill-splitting", "routes/bill-splitting.tsx"),
] satisfies RouteConfig;
