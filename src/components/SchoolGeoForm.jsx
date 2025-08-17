import React from "react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const SchoolGeoForm = React.memo(({ geoInfo, handleSchoolFormChange }) => {
  return (
    <div className="space-y-2" key={geoInfo?.id}>
      <Label className="text-sm sm:text-base">{geoInfo?.label}</Label>
      <Select onValueChange={(e) => handleSchoolFormChange(geoInfo.id, e)}>
        <SelectTrigger className="h-12 sm:h-10 text-base">
          <SelectValue placeholder={`Select ${geoInfo?.label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {geoInfo?.value.map((geoInfoVal) => {
              return (
                <SelectItem key={geoInfoVal} value={geoInfoVal}>
                  {geoInfoVal}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
});

export default React.memo(SchoolGeoForm);
