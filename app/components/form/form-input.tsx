import { Label } from "@radix-ui/react-label";
import { type ComponentProps, type ReactNode } from "react";
import { useFieldContext } from "~/hooks/form/form-context";
import { Input } from "../ui/input";

export default function FormInput({
  label,
  ...props
}: ComponentProps<"input"> & {
  label?: ReactNode;
}) {
  const field = useFieldContext<string>();
  const errors = field.state.meta.errors;
  const error = errors.at(0);
  return (
    <div className="grid gap-3">
      <Label htmlFor={field.name}>{label}</Label>
      <Input
        {...props}
        value={field.state.value}
        onChange={(e) => {
          field.handleChange(e.target.value);
        }}
        onBlur={field.handleBlur}
      />
      {typeof error === "string" && (
        <div className="text-sm text-red-500">{errors.join(",")}</div>
      )}
      {typeof error === "object" && (
        <div className="text-sm text-red-500">
          {errors.map((d) => d.message).join(",")}
        </div>
      )}
    </div>
  );
}
