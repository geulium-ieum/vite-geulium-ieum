import type { ListParams } from "~/types";
import { http } from "../utils";
import { FamilyGroupMemberSchema, FamilyGroupMemorialSchema, FamilyGroupSchema } from "~/constants/familyGroup";
import * as v from 'valibot';

export async function getFamilyGroupList({
  page,
  size,
  sort,
  token
}: ListParams & {
  token: string;
}) {
  try {
    const response = await http.get('family-group/list', {
      searchParams: {
        page,
        size,
        sort: sort?.map(({ field, direction }) => `${field},${direction}`).join(',')
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).json();
    return v.parse(FamilyGroupSchema, response);
  } catch (error) {
    throw error;
  }
}

export async function getFamilyGroupMemberList({
  id,
  page,
  size,
  sort,
  token
}: ListParams & {
  id: string;
  token: string;
}) {
  try {
    const response = await http.get(`family-group/${id}/member/list`, {
      searchParams: {
        page,
        size,
        sort: sort?.map(({ field, direction }) => `${field},${direction}`).join(',')
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).json();
    return v.parse(FamilyGroupMemberSchema, response);
  } catch (error) {
    throw error;
  }
}

export async function getFamilyGroupMemorialList({
  id,
  page,
  size,
  sort,
  token
}: ListParams & {
  id: string;
  token: string;
}) {
  try {
    const response = await http.get(`family-group/${id}/memorial/list`, {
      searchParams: {
        page,
        size,
        sort: sort?.map(({ field, direction }) => `${field},${direction}`).join(',')
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).json();
    return v.parse(FamilyGroupMemorialSchema, response);
  } catch (error) {
    throw error;
  }
}
