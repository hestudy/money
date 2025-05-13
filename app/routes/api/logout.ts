import { redirect } from "react-router";
import { authClient } from "~/lib/auth-client";

export async function clientAction() {
  await authClient.signOut();
  return redirect("/");
}
