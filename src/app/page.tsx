import { redirect } from "next/navigation";

export default async function DashboardPageRedirect() {
  redirect("/home");
}
