import { http } from "~/lib/utils";
import * as v from 'valibot';
import { MemorialFilterSchema } from "~/constants/memorial";
import type { MemorialFilterProps } from "~/types";

export async function getMemorialFilter({
  name,
  birthDate,
  deathDate,
  page,
  size,
  sort
}: MemorialFilterProps) {
  try {
    const response = await http.get('memorial/filter', {
      searchParams: {
        name,
        birthDate,
        deathDate,
        page,
        size,
        sort: sort?.join(',')
      }
    }).json();
    return v.parse(MemorialFilterSchema, response);
  } catch (error) {
    throw error;
  }
}