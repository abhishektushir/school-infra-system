import React, { useCallback, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MapPin, Save, School } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { infrastructureItems, schoolGeoInfo } from "@/clone-data-config";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { TOASTMESSAGE } from "@/constants";
import SchoolGeoForm from "./SchoolGeoForm";
import InfrastructureItems from "./InfrastructureItems";

function DataCollection() {
  const [schoolGeoFrom, setSchoolGeoForm] = useState({
    schoolName: "",
    state: "",
    district: "",
    block: "",
  });
  const [infrastructureData, setInfrastructureData] = useState({});
  const validateForm = (data) => {
    if (!data.schoolName || !data.state || !data.district || !data.block) {
      return TOASTMESSAGE.error1;
    }
    const allItemsCompleted = infrastructureItems.every(
      (item) =>
        data.infrastructure[item.id]?.available &&
        (data.infrastructure[item.id]?.available === "no" ||
          data.infrastructure[item.id]?.working)
    );
    if (!allItemsCompleted) return TOASTMESSAGE.error2;

    return null;
  };
  const handleSchoolFormChange = useCallback((field, value) => {
    setSchoolGeoForm((prev) => {
      return { ...prev, [field]: value };
    });
  }, []);
  const handleInfrastructureChange = useCallback((itemId, field, value) => {
    setInfrastructureData((prev) => {
      return {
        ...prev,
        [itemId]: {
          ...prev[itemId],
          [field]: value,
        },
      };
    });
  }, []);

  const handleSubmit = () => {
    const formData = {
      ...schoolGeoFrom,
      infrastructure: { ...infrastructureData },
    };
    const errorMsg = validateForm(formData);
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }
    setTimeout(() => {
      const existingData = JSON.parse(
        localStorage.getItem("schoolData") || "[]"
      );
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
    }, 0);
    toast.success(TOASTMESSAGE.success);
    setSchoolGeoForm({
      schoolName: "",
      state: "",
      district: "",
      block: "",
    });
    setInfrastructureData({});
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
              value={schoolGeoFrom.schoolName}
              onChange={(e) =>
                handleSchoolFormChange("schoolName", e.target.value)
              }
              placeholder="Enter school name"
              className="h-12 sm:h-10 text-base"
            />
          </div>
          {schoolGeoInfo.length > 0 &&
            schoolGeoInfo.map((geoInfo, idx) => {
              return (
                <SchoolGeoForm
                  geoInfo={geoInfo}
                  key={geoInfo.id}
                  handleSchoolFormChange={handleSchoolFormChange}
                />
              );
            })}
        </CardContent>
      </Card>
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
              <InfrastructureItems
                infrastructureData={infrastructureData[item.id]}
                onChange={handleInfrastructureChange}
                item={item}
                key={item.id}
              />
            ))}
          </div>
        </CardContent>
      </Card>
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
