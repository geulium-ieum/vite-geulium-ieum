import type { ListParams } from "~/types";
import { getFamilyGroupList, getFamilyGroupMemberList, getFamilyGroupMemorialList } from "../apis/familyGroup";

class FamilyGroupService {
  public get = {
    familyGroupList: async ({
      page,
      size,
      sort,
      token
    }: ListParams & {
      token: string;
    }) => {
      return await getFamilyGroupList({
        page,
        size,
        sort,
        token
      });
    },
    familyGroupMemberList: async ({
      id,
      page,
      size,
      sort,
      token
    }: ListParams & {
      id: string;
      token: string;
    }) => {
      return await getFamilyGroupMemberList({
        id,
        page,
        size,
        sort,
        token
      });
    },
    familyGroupMemorialList: async ({
      id,
      page,
      size,
      sort,
      token
    }: ListParams & {
      id: string;
      token: string;
    }) => {
      return await getFamilyGroupMemorialList({
        id,
        page,
        size,
        sort,
        token
      });
    }
  }
}

export const familyGroupService = new FamilyGroupService();
