const getEstimatedDelivery = (startOffset = 0, endOffset = 7) => {
  const today = new Date();
  const startDate = new Date(today);
  const endDate = new Date(today);

  startDate.setDate(startDate.getDate() + startOffset);
  endDate.setDate(endDate.getDate() + endOffset);

  const options = { month: "short", day: "numeric" };
  const startStr = startDate.toLocaleDateString("en-US", options);
  const endStr = endDate.toLocaleDateString("en-US", options);
  const yearStr = endDate.getFullYear();

  return `${startStr}–${endStr}, ${yearStr}`;
};

export default getEstimatedDelivery;