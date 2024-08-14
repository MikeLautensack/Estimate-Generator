export const generateColor = (name: string): string => {
  if (name === "accepted") {
    return "#0275d8";
  } else if (name === "rejected") {
    return "#FF0000";
  } else if (name === "change order requested") {
    return "#f0ad4e";
  } else if (name === "pending approval") {
    return "9d9d9d";
  } else if (name === "work completed") {
    return "#039487";
  } else if (name === "work in progress (edited)") {
    return "#30D5C8";
  } else if (name === "work in progress") {
    return "#add8e6";
  } else if (name === "billed") {
    return "";
  }
  return "";
};
