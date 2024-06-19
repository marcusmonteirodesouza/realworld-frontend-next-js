import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Logout } from "@/components/logout";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  return (
    <>
      <Logout />
      <h1>Home</h1>
    </>
  );
}
