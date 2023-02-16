import { Types } from "mongoose";
const ObjectId = Types.ObjectId;

export function checkValidId(toCheck: string): boolean {
  if (!ObjectId.isValid(toCheck)) return false;

  if (new ObjectId(toCheck).toString() !== toCheck) return false;

  return true;
}
