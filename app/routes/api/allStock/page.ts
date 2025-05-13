import { like, or } from "drizzle-orm";
import { redirect } from "react-router";
import { allStock } from "~/db/schema";
import { auth } from "~/lib/auth";
import db from "~/lib/db";
import type { Route } from "./+types/page";

export async function loader({ params, request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session) {
    return redirect("/login");
  }
  return await db
    .select()
    .from(allStock)
    .limit(Number(params.pageSize))
    .offset((Number(params.current) - 1) * Number(params.pageSize))
    .where(
      or(
        like(allStock.name, `%${params.keyword ?? ""}%`),
        like(allStock.symbol, `%${params.keyword ?? ""}%`)
      )
    );
}
