import { Hash, createHash } from "crypto";
import { getLogger } from "./logging";

function encryptPassword(password: string, salt: Buffer) {
  try {
    // Combine password and salt into a single buffer
    const fullPassword = Buffer.concat([Buffer.from(password), salt]);

    // Hash the combined buffer using SHA-256
    const hashedBytes = createHash("sha256").update(fullPassword).digest();

    // Convert the hashed bytes to a hexadecimal string
    const hashedPassword = hashedBytes.toString("hex");

    return hashedPassword;
  } catch (error) {
    getLogger().error("Error hashing password: ", error);
  }
}
const customSalt = Buffer.from("J#7pQzL9", "utf-8");
const hashedPassword = (password: string): string | undefined => {
  return encryptPassword(password, customSalt);
};

const verifyPassword = async (password: string, passwordHash: string) => {
  const valid = hashedPassword(password) == passwordHash;

  return valid;
};

module.exports = {
  hashedPassword,
  verifyPassword,
};
