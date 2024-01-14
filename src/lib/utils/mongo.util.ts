import type { Document } from "mongoose";

export const toObject = <T>(doc: Document): T => {
  return doc.toObject({ flattenObjectIds: true });
}