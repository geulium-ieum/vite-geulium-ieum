import type { MemorialFilterProps } from "~/types";
import { getMemorialFilter } from "~/lib/apis/memorial";

class MemorialService {
  public get = {
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