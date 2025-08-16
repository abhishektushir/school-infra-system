import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { School } from "lucide-react";
import { infrastructureItems } from "@/clone-data-config";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

function CollectionForm({ formData, setFormData }) {
  const handleInfrastructureChange = (itemId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      infrastructure: {
        ...prev.infrastructure,
        [itemId]: {
          ...prev.infrastructure[itemId],
          [field]: value,
        },
      },
    }));
  };
  return (
    <Card>
      <CardHeader className="pb-4 sm:pb-6">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <School className="h-4 w-4 sm:h-5 sm:w-5" />
          <div>
            <div>Infrastructure Assessment</div>
            <div className="text-sm opacity-80">अवसंरचना मूल्यांकन</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          {infrastructureItems.map((item) => (
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
                    badge
                    {/* enter badge here */}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-5">
                <div className="space-y-3">
                  <Label className="text-sm sm:text-base">
                    Available? / उपलब्ध है?
                  </Label>
                  <RadioGroup
                    value={formData.infrastructure[item.id]?.available || ""}
                    onValueChange={(value) =>
                      handleInfrastructureChange(item.id, "available", value)
                    }
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

                {formData.infrastructure[item.id]?.available === "yes" && (
                  <div className="space-y-3">
                    <Label className="text-sm sm:text-base">
                      Working Condition? / काम की स्थिति?
                    </Label>
                    <RadioGroup
                      value={formData.infrastructure[item.id]?.working || ""}
                      onValueChange={(value) =>
                        handleInfrastructureChange(item.id, "working", value)
                      }
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default CollectionForm;
