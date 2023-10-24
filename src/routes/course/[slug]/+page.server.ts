import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ params, parent }) => {
  const { session } = await parent();
  const { slug } = params;

  if (!session?.user) throw redirect(303, "/")
  return {}
}