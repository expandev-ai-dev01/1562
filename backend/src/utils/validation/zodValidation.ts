import { z } from 'zod';

export const zString = z.string().min(1);
export const zNullableString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema.nullable();
};

export const zName = z.string().min(1).max(200);
export const zDescription = z.string().max(500);
export const zNullableDescription = z.string().max(500).nullable();

export const zBit = z.union([z.literal(0), z.literal(1)]);
export const zBoolean = z.boolean();

export const zFK = z.number().int().positive();
export const zNullableFK = z.number().int().positive().nullable();

export const zDateString = z.string().datetime();
export const zNullableDateString = z.string().datetime().nullable();

export const zEmail = z.string().email().max(255);
export const zPhone = z.string().max(20);

export const zNumeric = z.number();
export const zPositiveNumeric = z.number().positive();
export const zNullableNumeric = z.number().nullable();

export const zPrice = z.number().min(0);
export const zQuantity = z.number().int().min(0);
