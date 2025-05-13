import { CommandLoading } from "cmdk";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState, type ComponentProps } from "react";
import { useFieldContext } from "~/hooks/form/form-context";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function FormSelect({
  options,
  loading,
  label,
  onSearch,
  ...props
}: {
  options?: {
    label: string;
    value: string;
  }[];
  loading?: boolean;
  label?: string;
  onSearch?: (keyword: string) => void;
} & ComponentProps<typeof Command>) {
  const field = useFieldContext();
  const value = field.state.value;
  const [open, setOpen] = useState(false);
  const errors = field.state.meta.errors;
  const error = errors.at(0);

  return (
    <div className="grid gap-3">
      <Label htmlFor={field.name}>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? options?.find((option) => option.value === value)?.label
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
              {!loading && <CommandEmpty>No {label} found.</CommandEmpty>}
              <CommandGroup>
                {options?.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      field.handleChange(
                        currentValue === value ? "" : currentValue
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
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
