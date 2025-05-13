import { useQuery } from "@tanstack/react-query";
import { CommandLoading } from "cmdk";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFetcher, type ActionFunctionArgs } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { type stock } from "~/db/schema";
import { cn } from "~/lib/utils";
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
  const form = useForm<typeof stock.$inferInsert>();

  const [keyword, setKyeword] = useState("");
  const { isPending, data } = useQuery<Route.ComponentProps["loaderData"]>({
    queryKey: ["allStock", keyword],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(`/api/allStock/page/1/20/${queryKey[1]}`);
      return await res.json();
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          fetcher.submit(
            {
              stockId: values.stockId,
            },
            {
              method: "post",
              action: "/stock/add",
            }
          );
        })}
      >
        <FormField
          control={form.control}
          name="stockId"
          render={({ field }) => {
            const [open, setOpen] = useState(false);
            return (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                      >
                        {field.value
                          ? options?.find((option) => option.value === value)
                              ?.label
                          : `Select ${label}`}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command {...props}>
                        <CommandInput
                          placeholder={`Search ${label}`}
                          onInput={(e) => {
                            onSearch?.(e.currentTarget.value);
                          }}
                        />
                        <CommandList>
                          {loading && <CommandLoading />}
                          {!loading && (
                            <CommandEmpty>No {label} found.</CommandEmpty>
                          )}
                          <CommandGroup>
                            {options?.map((option) => (
                              <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={(currentValue) => {
                                  field.onChange(
                                    currentValue === field.value
                                      ? ""
                                      : currentValue
                                  );
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value === option.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {option.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
