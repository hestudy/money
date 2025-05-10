import { createFormHook } from "@tanstack/react-form";
import FormInput from "~/components/form/form-input";
import FormSubmit from "~/components/form/form-submit";
import { fieldContext, formContext } from "./form-context";

export const { useAppForm } = createFormHook({
  fieldContext: fieldContext,
  formContext: formContext,
  fieldComponents: {
    FormInput,
  },
  formComponents: {
    FormSubmit,
  },
});
