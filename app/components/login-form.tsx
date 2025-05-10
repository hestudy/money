import { GalleryVerticalEnd } from "lucide-react";
import { Link, useFetcher } from "react-router";

import { z } from "zod";
import { useAppForm } from "~/hooks/form/form-hook";
import { cn } from "~/lib/utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const fetcher = useFetcher();
  const loading = fetcher.state !== "idle";

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit(props) {
      fetcher.submit(props.value, {
        action: "/login",
        method: "POST",
      });
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.AppForm>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <a
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex size-8 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-6" />
                </div>
                <span className="sr-only">Money</span>
              </a>
              <h1 className="text-xl font-bold">Welcome to Money</h1>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <form.AppField
                name="email"
                validators={{
                  onChange: z.string().email(),
                }}
                children={(field) => {
                  return (
                    <field.FormInput
                      label="Email"
                      placeholder="m@example.com"
                    />
                  );
                }}
              />
              <form.AppField
                name="password"
                validators={{
                  onChange: z.string().min(8),
                }}
                children={(field) => {
                  return (
                    <field.FormInput
                      label="Password"
                      placeholder="********"
                      type="password"
                    />
                  );
                }}
              />
              <form.FormSubmit loading={loading}>Login</form.FormSubmit>
            </div>
          </div>
        </form.AppForm>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
