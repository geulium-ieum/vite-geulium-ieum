import { userContext } from "~/context/userContext";
import type { Route } from "./+types/FamilyGroupDetail";
import { getSession } from "~/lib/sessions.server";
import { redirect } from "react-router";
import { familyGroupService } from "~/lib/services/familyGroup";

export async function loader({ request, context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);
  const token = session.get("token");
  if (!user || !token) {
    return redirect("/login");
  }
  const pathname = new URL(request.url).pathname;
  const id = pathname.split("/").pop();
  if (!id) {
    return redirect("/family-groups");
  }
  const familyGroupDetail = await familyGroupService.get.familyGroupDetail({
    id,
    token
  });
  return { familyGroupDetail };
}

export default function FamilyGroupDetail({ loaderData }: Route.ComponentProps) {
  const { familyGroupDetail } = loaderData;
  return (
    <>
      <h1>{familyGroupDetail.name}</h1>
    </>
  )
}
