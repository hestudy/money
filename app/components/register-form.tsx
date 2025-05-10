import { GalleryVerticalEnd } from "lucide-react";
import { Link, useFetcher } from "react-router";

import { z } from "zod";
import { useAppForm } from "~/hooks/form/form-hook";
import { cn } from "~/lib/utils";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const fetcher = useFetcher();
  const loading = fetcher.state !== "idle";

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    onSubmit(props) {
      fetcher.submit(props.value, {
        action: "/register",
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
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <form.AppField
                name="name"
                validators={{
                  onChange: z.string().min(1),
                }}
                children={(field) => {
                  return (
                    <field.FormInput label="Name" placeholder="John Doe" />
                  );
                }}
              />
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
              <form.FormSubmit loading={loading}>Register</form.FormSubmit>
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
