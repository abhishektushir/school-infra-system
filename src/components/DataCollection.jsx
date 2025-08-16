import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MapPin, Save } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { infrastructureItems, schoolGeoInfo } from "@/clone-data-config";
import CollectionForm from "./CollectionForm";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { TOASTMESSAGE } from "@/constants";
function DataCollection() {
  const [formData, setFormData] = useState({
    schoolName: "",
    state: "",
    district: "",
    block: "",
    infrastructure: {},
  });

  const handleSubmit = () => {
    if (
      !formData.schoolName ||
      !formData.state ||
      !formData.district ||
      !formData.block
    ) {
      toast.error(TOASTMESSAGE.error1);
      return;
    }

    const allItemsCompleted = infrastructureItems.every(
      (item) =>
        formData.infrastructure[item.id]?.available &&
        (formData.infrastructure[item.id]?.available === "no" ||
          formData.infrastructure[item.id]?.working)
    );

    if (!allItemsCompleted) {
      toast.error(TOASTMESSAGE.error2);
      return;
    }
    const existingData = JSON.parse(localStorage.getItem("schoolData") || "[]");
    const newEntry = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      submittedBy: "Self Help Group Member",
    };
    localStorage.setItem(
      "schoolData",
      JSON.stringify([...existingData, newEntry])
    );

    toast.success(TOASTMESSAGE.success);

    setFormData({
      schoolName: "",
      district: "",
      state: "",
      block: "",
      infrastructure: {},
    });
  };
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
            <div>
              <div>School Information</div>
              <div className="text-sm opacity-80">स्कूल की जानकारी</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <Label htmlFor="schoolName" className="text-sm sm:text-base">
              School Name / स्कूल का नाम
            </Label>
            <Input
              id="schoolName"
              value={formData.schoolName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, schoolName: e.target.value }))
              }
              placeholder="Enter school name"
              className="h-12 sm:h-10 text-base"
            />
          </div>
          {schoolGeoInfo.length > 0 &&
            schoolGeoInfo.map((geoInfo, idx) => {
              return (
                <div className="space-y-2" key={geoInfo?.id}>
                  <Label className="text-sm sm:text-base">
                    {geoInfo?.label}
                  </Label>
                  <Select
                    value={formData[geoInfo.id]}
                    onValueChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [geoInfo?.id]: e,
                      }))
                    }>
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
            })}
        </CardContent>
      </Card>
      <CollectionForm formData={formData} setFormData={setFormData} />
      <div className="flex justify-center pb-4 sm:pb-0">
        <Button
          onClick={handleSubmit}
          size="lg"
          className="gap-2 h-12 sm:h-10 px-6 sm:px-4 text-base sm:text-sm w-full sm:w-auto max-w-sm">
          <Save className="h-4 w-4" />
          Save Assessment / मूल्यांकन सहेजें
        </Button>
      </div>
    </div>
  );
}

export default DataCollection;
