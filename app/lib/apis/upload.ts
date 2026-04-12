import { http } from "../utils";

export async function memorialPhoto({
  token,
  memorialId
}: {
  token: string;
  memorialId: string;
}) {
  try {
    await http.post('upload/memorial-photo', {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      searchParams: {
        memorialId
      }
    })
  } catch (error) {
    throw error;
  }
}
