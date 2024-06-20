import { auth } from "@/auth";
import { HomePage } from "./home-page";
import { LandingPage } from "./landing-page";

export default async function IndexPage() {
  const session = await auth();

  if (session && session.user && session.user.name) {
    return <HomePage user={{ name: session.user.name }} />;
  }

  return <LandingPage />;
}
