import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  AlertTriangle,
  CheckCircle,
  Filter,
  School,
  XCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { infrastructureItems } from "@/clone-data-config";
import { Label } from "./ui/label";
import { getInfrastructureStats } from "@/customUtils";
import InfraCharts from "./InfraCharts";

function Dashboard() {
  const [schoolData, setSchoolData] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [selectedState, setSelectedState] = useState("all");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("schoolData") || "[]");
    setSchoolData(data);
  }, []);
  const filteredData = schoolData.filter((school) => {
    if (selectedState !== "all" && school.state !== selectedState) return false;
    if (selectedDistrict !== "all" && school.district !== selectedDistrict)
      return false;
    return true;
  });
  const states = [...new Set(schoolData.map((school) => school.state))];
  const districts =
    selectedState === "all"
      ? [...new Set(schoolData.map((school) => school.district))]
      : [
          ...new Set(
            schoolData
              .filter((school) => school.state === selectedState)
              .map((school) => school.district)
          ),
        ];
  const totalSchools = filteredData.length;

  const infrastructureStats = getInfrastructureStats(
    infrastructureItems,
    filteredData,
    totalSchools
  );
  const overallStats = infrastructureItems.reduce(
    (acc, item) => {
      const stats = infrastructureStats[item.id];
      acc.working += stats?.working || 0;
      acc.needsRepair += stats?.needsRepair || 0;
      acc.notAvailable += stats?.notAvailable || 0;
      return acc;
    },
    { working: 0, needsRepair: 0, notAvailable: 0 }
  );
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
            <div>
              <div>Filters</div>
              <div className="text-sm opacity-80">फिल्टर</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Label className="text-sm sm:text-base block">State / राज्य</Label>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="h-12 sm:h-10">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 space-y-2">
            <Label className="text-sm sm:text-base block">
              District / जिला
            </Label>
            <Select
              value={selectedDistrict}
              onValueChange={setSelectedDistrict}>
              <SelectTrigger className="h-12 sm:h-10">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <School className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Total Schools Surveyed
                </p>
                <p className="text-xl sm:text-2xl">{totalSchools}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Working Items
                </p>
                <p className="text-xl sm:text-2xl">{overallStats.working}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 flex-shrink-0" />
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Needs Repair
                </p>
                <p className="text-xl sm:text-2xl">
                  {overallStats.needsRepair}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <XCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 flex-shrink-0" />
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Not Available
                </p>
                <p className="text-xl sm:text-2xl">
                  {overallStats.notAvailable}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <InfraCharts
        infrastructureStats={infrastructureStats}
        overallStats={overallStats}
      />
    </div>
  );
}

export default Dashboard;
