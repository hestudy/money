import { Outlet, redirect } from "react-router";
import { authClient } from "~/lib/auth-client";

export async function clientLoader() {
  const session = await authClient.getSession();
  if (!session.data?.user) {
    return redirect("/login");
  }
}

export function HydrateFallback() {
  return <div>loading...</div>;
}

export default function authLayout() {
  return <Outlet />;
}
