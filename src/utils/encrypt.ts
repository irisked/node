import * as crypto from "crypto";

export const salt = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

export const hash = (salt: string, password: string): string => {
  return crypto.createHmac("sha1", salt)
    .update(password)
    .digest("hex");
};
