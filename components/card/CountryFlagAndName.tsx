import { findCountryByCode } from "@/utils/countries";
import Flag from "react-world-flags";

export function CountryFlagAndName({ countryCode }: { countryCode: string }) {
  // console.log(countryCode);
  const validCountry = findCountryByCode(countryCode);
  // console.log(validCountry);
  const countryName =
    validCountry!.name.length > 20
      ? `${validCountry!.name.substring(0, 20)}...`
      : validCountry!.name;
  return (
    <span className="flex items-center gap-2 text-sm ">
      {/* <span className="flex justify-between items-center gap-2 text-sm "> */}
      {/* {validCountry?.flag} {countryName} */}

      <Flag
        code={validCountry?.code || "US"}
        style={{ width: 16, height: 16 }}
      />
      {countryName}
    </span>
  );
}
