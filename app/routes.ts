import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/authLayout.tsx", [
    layout("./layouts/initLayout.tsx", [index("./routes/dashboard.tsx")]),
  ]),
  route("/api/auth/*", "./routes/api/auth/$.ts"),
  route("/login", "./routes/login.tsx"),
  route("/register", "./routes/register.tsx"),
] satisfies RouteConfig;
