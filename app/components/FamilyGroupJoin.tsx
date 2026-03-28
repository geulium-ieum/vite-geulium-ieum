import { getSession } from "~/lib/sessions.server";
import type { Route } from "./+types/FamilyGroupJoin";
import { redirect } from "react-router";
import { familyGroupService } from "~/lib/services/familyGroup";
import { Spinner } from "./ui/spinner";

export async function loader({ request }: Route.LoaderArgs) {
  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);
  const token = session.get("token");
  if (!token) return redirect("/login");
  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  const groupId = searchParams.get("id");
  if (!groupId) return redirect("/family-groups");
  await familyGroupService.post.joinFamilyGroup({
    id: groupId,
    token
  });
  return redirect(`/family-groups/${groupId}`);
}

export default function FamilyGroupJoin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-900 via-purple-800 to-blue-900 py-12 px-4">
      <Spinner className="size-12 text-white" />
    </div>
  )
}
