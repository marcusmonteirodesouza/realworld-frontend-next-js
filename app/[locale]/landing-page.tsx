import Link from "next/link";
import { useTranslations } from "next-intl";

export function LandingPage() {
  const t = useTranslations("LandingPage");

  return (
    <>
      <h1>{t("slogan")}</h1>
      <Link href="/login">Login</Link>
    </>
  );
}
