import { type ComponentProps } from "react";
import { useFormContext } from "~/hooks/form/form-context";
import Spin from "../spin";
import { Button } from "../ui/button";

export default function FormSubmit({
  loading,
  ...props
}: ComponentProps<typeof Button> & {
  loading?: boolean;
}) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          {...props}
          disabled={isSubmitting || props.disabled || loading}
          type="submit"
        >
          {isSubmitting && <Spin />}
          {props.children}
        </Button>
      )}
    </form.Subscribe>
  );
}
