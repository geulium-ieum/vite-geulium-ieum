import type { ListParams, MemorialFilterProps } from "~/types";
import { getMemorialFilter, getMemorialList } from "~/lib/apis/memorial";

class MemorialService {
  public get = {
    memorialList: async ({
      page,
      size,
      sort
    }: ListParams) => {
      return await getMemorialList({
        page,
        size,
        sort
      });
    },
    memorialFilter: async ({
      name,
      birthDate,
      deathDate,
      page,
      size,
      sort
    }: MemorialFilterProps) => {
      return await getMemorialFilter({
        name,
        birthDate,
        deathDate,
        page,
        size,
        sort
      });
    }
  }
}

export const memorialService = new MemorialService();