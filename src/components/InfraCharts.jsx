import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { COLORS, CONDITION } from "@/constants";
import { infrastructureItems } from "@/clone-data-config";

const renderPieLabel = ({ name, percent }) =>
  `${name} ${(percent * 100).toFixed(0)}%`;
function InfraCharts({ infrastructureStats, overallStats }) {
  const chartData = infrastructureItems.map((item) => ({
    name: item.name,
    working: infrastructureStats[item.id]?.working || 0,
    needsRepair: infrastructureStats[item.id]?.needsRepair || 0,
    notAvailable: infrastructureStats[item.id]?.notAvailable || 0,
  }));
  const pieData = [
    {
      name: CONDITION.working,
      value: overallStats.working,
      color: COLORS.working,
    },
    {
      name: CONDITION.repair,
      value: overallStats.needsRepair,
      color: COLORS.needsRepair,
    },
    {
      name: CONDITION.availability,
      value: overallStats.notAvailable,
      color: COLORS.notAvailable,
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
      {/* Bar Chart */}
      <Card>
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="text-sm sm:text-base lg:text-lg">
            Infrastructure Status by Item
            <div className="text-xs sm:text-sm opacity-80 mt-1">
              वस्तु के अनुसार अवसंरचना स्थिति
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 10, left: 10, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  fontSize={10}
                  interval={0}
                />
                <YAxis fontSize={10} />
                <Tooltip />
                <Bar
                  dataKey="working"
                  stackId="a"
                  fill={COLORS.working}
                  name="Working"
                />
                <Bar
                  dataKey="needsRepair"
                  stackId="a"
                  fill={COLORS.needsRepair}
                  name="Needs Repair"
                />
                <Bar
                  dataKey="notAvailable"
                  stackId="a"
                  fill={COLORS.notAvailable}
                  name="Not Available"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card>
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="text-sm sm:text-base lg:text-lg">
            Overall Status Distribution
            <div className="text-xs sm:text-sm opacity-80 mt-1">
              समग्र स्थिति वितरण
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius="70%"
                  dataKey="value"
                  label={renderPieLabel}
                  labelLine={false}
                  fontSize={10}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
InfraCharts.propTypes = {
  infrastructureStats: PropTypes.objectOf(
    PropTypes.shape({
      working: PropTypes.number.isRequired,
      needsRepair: PropTypes.number.isRequired,
      notAvailable: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
    })
  ).isRequired,
  overallStats: PropTypes.shape({
    working: PropTypes.number.isRequired,
    needsRepair: PropTypes.number.isRequired,
    notAvailable: PropTypes.number.isRequired,
  }).isRequired,
};

export default React.memo(InfraCharts);
