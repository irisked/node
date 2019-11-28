import * as crypto from "crypto";

const salt = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

const hash = (salt: string, password: string): string => {
  return crypto.createHmac("sha1", salt)
    .update(password)
    .digest("hex");
};

export default { salt, hash };
