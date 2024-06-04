import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../shared/constants";

export async function generateHash(text: string) {
  const salt = await generateSalt();
  const hash = await bcrypt.hashSync(text, salt);
  return hash;
}

export async function generateSalt() {
  return bcrypt.genSaltSync(SALT_ROUNDS);
}

export async function matchPassword(text: string, hash: string) {
  return bcrypt.compareSync(text, hash);
}

export function generateOTP() {
  // Generate a random 6-digit number
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
