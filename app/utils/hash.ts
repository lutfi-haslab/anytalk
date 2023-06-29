import { SHA256 } from "crypto-js";

export const generateId = (text: string) => {
  return "user" + SHA256(text).toString().substring(0, 8);
};
