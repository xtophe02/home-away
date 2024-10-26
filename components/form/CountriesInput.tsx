import { Label } from "@/components/ui/label";
import { formattedCountries } from "@/utils/countries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Flag from "react-world-flags";

const name = "country";
export default function CountriesInput({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  // console.log(formattedCountries[0].code, formattedCountries[10].code);
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        country
      </Label>
      <Select
        defaultValue={defaultValue || formattedCountries[0].code}
        name={name}
        required
      >
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {formattedCountries.map((item) => {
            return (
              <SelectItem key={item.code} value={item.code}>
                <span className="flex items-center gap-2">
                  <Flag code={item.code} style={{ width: 16, height: 16 }} />
                  {item.name}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
