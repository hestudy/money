import { redirect, type ActionFunctionArgs } from "react-router";
import { toast } from "sonner";
import { RegisterForm } from "~/components/register-form";
import { authClient } from "~/lib/auth-client";

export async function clientAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

  const res = await authClient.signUp.email({
    email: email as string,
    password: password as string,
    name: name as string,
  });

  if (res?.data?.user) {
    return redirect("/login");
  }

  if (res.error) {
    toast.error(res.error.message);
  }
}

export default function Register() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
}
