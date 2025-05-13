import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/authLayout.tsx", [
    layout("./layouts/initLayout.tsx", [
      layout("./layouts/menuLayout.tsx", [
        index("./routes/dashboard.tsx"),
        route("/stock/add", "./routes/stock/add.tsx"),
      ]),
    ]),
  ]),
  route("/login", "./routes/login.tsx"),
  route("/register", "./routes/register.tsx"),
  ...prefix("/api", [
    route("/auth/*", "./routes/api/auth/$.ts"),
    route("/logout", "./routes/api/logout.ts"),
    ...prefix("/allStock", [
      route(
        "/page/:current/:pageSize/:keyword?",
        "./routes/api/allStock/page.ts"
      ),
    ]),
  ]),
] satisfies RouteConfig;
