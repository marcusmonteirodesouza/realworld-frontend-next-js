import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Logout } from "@/components/logout";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  console.log("session", session);

  return (
    <>
      <Logout />
      <h1>Home</h1>
    </>
  );
}
