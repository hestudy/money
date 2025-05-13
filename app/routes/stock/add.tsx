import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFetcher, type ActionFunctionArgs } from "react-router";
import { z } from "zod";
import { type stock } from "~/db/schema";
import { useAppForm } from "~/hooks/form/form-hook";
import type { Route } from "../api/allStock/+types/page";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const stockId = formData.get("stockId");
  console.log(stockId);
  await new Promise((resolve) => setTimeout(resolve, 10000));
}

export default function Add() {
  const fetcher = useFetcher();
  const loading = fetcher.state !== "idle";
  const form = useAppForm({
    defaultValues: {
      stockId: "",
    } as typeof stock.$inferInsert,
    onSubmit(props) {
      fetcher.submit(
        {
          stockId: props.value.stockId,
        },
        {
          method: "post",
          action: "/stock/add",
        }
      );
    },
  });

  const [keyword, setKyeword] = useState("");
  const { isPending, data } = useQuery<Route.ComponentProps["loaderData"]>({
    queryKey: ["allStock", keyword],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(`/api/allStock/page/1/20/${queryKey[1]}`);
      return await res.json();
    },
  });

  return (
    <form
      className="px-4 space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppForm>
        <form.AppField
          name="stockId"
          validators={{
            onBlur: z.string().min(1, "Stock is required"),
          }}
          children={(field) => {
            return (
              <field.FormSelect
                loading={isPending}
                options={data?.map((item) => {
                  return {
                    label: item.name,
                    value: item.id,
                  };
                })}
                label="Stock"
                onSearch={(v) => {
                  setKyeword(v);
                }}
                shouldFilter={false}
              />
            );
          }}
        ></form.AppField>
        <form.FormSubmit loading={loading}>Submit</form.FormSubmit>
      </form.AppForm>
    </form>
  );
}
