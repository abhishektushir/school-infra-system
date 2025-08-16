import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, ClipboardList } from "lucide-react";
import React, { useState } from "react";
import DataCollection from "../components/DataCollection";
import Dashboard from "../components/Dashboard";
function Home() {
  const [activeTab, setActiveTab] = useState("collection");
  return (
   <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6 h-auto">
            <TabsTrigger 
              value="collection" 
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-3 sm:py-2 px-2 sm:px-4"
            >
              <ClipboardList className="h-4 w-4 sm:h-4 sm:w-4" />
              <div className="text-center sm:text-left">
                <div className="text-xs sm:text-sm">Data Collection</div>
                <div className="text-[10px] sm:text-xs opacity-80">डेटा संग्रह</div>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="dashboard" 
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-3 sm:py-2 px-2 sm:px-4"
            >
              <BarChart3 className="h-4 w-4 sm:h-4 sm:w-4" />
              <div className="text-center sm:text-left">
                <div className="text-xs sm:text-sm">Dashboard</div>
                <div className="text-[10px] sm:text-xs opacity-80">डैशबोर्ड</div>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="collection">
            <DataCollection />
          </TabsContent>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
        </Tabs>
  );
}

export default Home;
