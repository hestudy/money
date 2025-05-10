import { LoaderCircleIcon } from "lucide-react";

export default function Spin() {
  return (
    <LoaderCircleIcon
      className="-ms-1 animate-spin"
      size={16}
      aria-hidden="true"
    />
  );
}
