import { Logout } from "@/components/logout";
import { useTranslations } from "next-intl";

interface HomePageProps {
  user: {
    name: string;
  };
}

export function HomePage({ user }: HomePageProps) {
  const t = useTranslations("HomePage");

  return (
    <>
      <h1>Hello {user.name}!</h1>
      <Logout />
    </>
  );
}
