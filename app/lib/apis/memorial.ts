import { http, JSONbigNative } from "~/lib/utils";
import * as v from 'valibot';
import { MemorialSchema } from "~/constants/memorial";
import type { ListParams, MemorialFilterProps } from "~/types";

export async function getMemorialList({
  page,
  size,
  sort
}: ListParams) {
  try {
    const response = await http.get('memorial/list', {
      searchParams: {
        page,
        size,
        sort: sort?.map(({ field, direction }) => `${field},${direction}`).join(',')
      }
    });
    const textData = await response.text();
    const jsonData = JSONbigNative.parse(textData);
    return v.parse(MemorialSchema, jsonData);
  } catch (error) {
    throw error;
  }
}

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
        sort: sort?.map(({ field, direction }) => `${field},${direction}`).join(',')
      }
    }).json();
    return v.parse(MemorialSchema, response);
  } catch (error) {
    throw error;
  }
}