import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import { LuStar } from "react-icons/lu";

export default function RatingInput({
  name,
  labelText,
}: {
  name: string;
  labelText?: string;
}) {
  const numbers = Array.from({ length: 5 }, (_, i) => {
    const value = i + 1;
    return value.toString();
  });
  const [state, setState] = useState("3");
  return (
    <div className="mb-2 flex flex-col items-start">
      <Label htmlFor={name} className="capitalize">
        {labelText || name}
      </Label>

      <ToggleGroup
        type="single"
        defaultValue={state}
        onValueChange={(val) => setState(val)}
      >
        {numbers.map((number) => {
          return (
            <ToggleGroupItem value={number} key={number}>
              <LuStar className="w-7 h-7 text-yellow-500 relative" />
              <span
                className={`absolute ${
                  state === number ? "text-xl font-bold" : "text-sm"
                }`}
              >
                {number}
              </span>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
      <input type="hidden" name={name} value={state} />
    </div>
  );
}
