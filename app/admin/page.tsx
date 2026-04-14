import { cookies } from "next/headers";
import AdminClient from "./AdminClient";
import AdminLogin from "./AdminLogin";
import { getAllArticles } from "@/lib/articles";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  const isAuthenticated = session?.value === "authenticated";

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const articles = getAllArticles();
  return <AdminClient articles={articles} />;
}
