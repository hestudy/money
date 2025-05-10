import { redirect, type ActionFunctionArgs } from "react-router";
import { toast } from "sonner";
import { LoginForm } from "~/components/login-form";
import { authClient } from "~/lib/auth-client";

export async function clientAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await authClient.signIn.email({
    email: email as string,
    password: password as string,
  });

  if (res?.data?.user) {
    return redirect("/");
  }

  if (res.error) {
    toast.error(res.error.message);
  }
}

export default function LoginPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
