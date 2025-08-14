import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, ClipboardList } from "lucide-react";
import React from "react";

function Home() {
    return <Tabs  className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="collection" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              Data Collection
              <span className="text-xs">डेटा संग्रह</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
              <span className="text-xs">डैशबोर्ड</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="collection">
            {/* <DataCollection /> */}
            abc
          </TabsContent>

          <TabsContent value="dashboard">
            {/* <Dashboard /> */}
            fdg
          </TabsContent>
        </Tabs>
}

export default Home;
