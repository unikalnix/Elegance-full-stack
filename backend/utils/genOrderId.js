import { randomUUID } from 'crypto';

const generateOrderId = () => {
  const prefix = "ORD-";
  const shortUUID = randomUUID().split("-")[0];
  return `${prefix}${shortUUID.toUpperCase()}`;
};

export default generateOrderId;