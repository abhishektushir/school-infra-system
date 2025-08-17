import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { getInfrastructureStatus } from "@/customUtils";
import { Badge } from "./ui/badge";
import { AlertTriangle, Check, X } from "lucide-react";
import { CONDITION } from "@/constants";
const getStatusBadge = (status) => {
  switch (status) {
    case CONDITION.working:
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <Check className="h-3 w-3 mr-1" />
          {CONDITION.working}
        </Badge>
      );
    case CONDITION.repair:
      return (
        <Badge className="bg-orange-100 text-orange-800 border-orange-200">
          <AlertTriangle className="h-3 w-3 mr-1" />
          {CONDITION.repair}
        </Badge>
      );
    case CONDITION.availability:
      return (
        <Badge className="bg-red-100 text-red-800 border-red-200">
          <X className="h-3 w-3 mr-1" />
          {CONDITION.availability}
        </Badge>
      );
    default:
      return (
        <Badge className="bg-red-500 text-white border-red-200">Pending</Badge>
      );
  }
};
const InfrastructureItems = React.memo(({infrastructureData , onChange, item }) => {


  return (
    <Card key={item.id} className="border-2 border-muted">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="flex items-center justify-between text-sm sm:text-base">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-2xl sm:text-3xl">{item.icon}</span>
            <div>
              <div className="text-sm sm:text-base">{item.name}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                {item.hindi}
              </div>
            </div>
          </div>
          <div className="ml-2">
            {getStatusBadge(getInfrastructureStatus(infrastructureData))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-5">
        <div className="space-y-3">
          <Label className="text-sm sm:text-base">
            Available? / उपलब्ध है?
          </Label>
          <RadioGroup
            value={infrastructureData?.available || ""}
            onValueChange={(value) => onChange(item.id, "available", value)}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex items-center space-x-3 p-2 sm:p-0">
              <RadioGroupItem
                value="yes"
                id={`${item.id}-available-yes`}
                className="h-5 w-5 sm:h-4 sm:w-4"
              />
              <Label
                htmlFor={`${item.id}-available-yes`}
                className="text-sm sm:text-base cursor-pointer flex-1">
                Yes / हाँ
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-2 sm:p-0">
              <RadioGroupItem
                value="no"
                id={`${item.id}-available-no`}
                className="h-5 w-5 sm:h-4 sm:w-4"
              />
              <Label
                htmlFor={`${item.id}-available-no`}
                className="text-sm sm:text-base cursor-pointer flex-1">
                No / नहीं
              </Label>
            </div>
          </RadioGroup>
        </div>

        {infrastructureData?.available === "yes" && (
          <div className="space-y-3">
            <Label className="text-sm sm:text-base">
              Working Condition? / काम की स्थिति?
            </Label>
            <RadioGroup
              value={infrastructureData?.working || ""}
              onValueChange={(value) => onChange(item.id, "working", value)}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex items-center space-x-3 p-2 sm:p-0">
                <RadioGroupItem
                  value="yes"
                  id={`${item.id}-working-yes`}
                  className="h-5 w-5 sm:h-4 sm:w-4"
                />
                <Label
                  htmlFor={`${item.id}-working-yes`}
                  className="text-sm sm:text-base cursor-pointer flex-1">
                  Good / अच्छा
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-2 sm:p-0">
                <RadioGroupItem
                  value="no"
                  id={`${item.id}-working-no`}
                  className="h-5 w-5 sm:h-4 sm:w-4"
                />
                <Label
                  htmlFor={`${item.id}-working-no`}
                  className="text-sm sm:text-base cursor-pointer flex-1">
                  Needs Repair / मरम्मत चाहिए
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}
      </CardContent>
    </Card>
  );
});

export default React.memo(InfrastructureItems);
