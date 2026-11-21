import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";

export default async function AdminIndex() {
  redirect((await isAdmin()) ? "/admin/stories" : "/admin/login");
}
