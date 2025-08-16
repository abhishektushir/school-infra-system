import { CONDITION } from "./constants";

export const getInfrastructureStats = (
  infrastructureItems,
  filteredData,
  totalSchools
) => {
  const stats = {};
  infrastructureItems.forEach((item) => {
    let working = 0,
      needsRepair = 0,
      notAvailable = 0;

    filteredData.forEach((school) => {
      const infrastructure = school.infrastructure[item.id];
      if (infrastructure?.available === "no") {
        notAvailable++;
      } else if (infrastructure?.working === "yes") {
        working++;
      } else if (infrastructure?.working === "no") {
        needsRepair++;
      }
    });

    stats[item.id] = {
      working,
      needsRepair,
      notAvailable,
      total: totalSchools,
    };
  });
  return stats;
};


export const getInfrastructureStatus = (formData,itemId) => {
    const item = formData.infrastructure[itemId];
    if (!item?.available) return null;
    if (item.available === "no") return CONDITION.availability;
    if (item.working === "yes") return CONDITION.working;
    if (item.working === "no") return CONDITION.repair;
    return null;
  };

  