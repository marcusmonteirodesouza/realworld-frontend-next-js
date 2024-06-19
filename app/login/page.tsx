import { AuthError, CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";

interface LoginPageProps {
  searchParams: {
    error: string;
  };
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col gap-2">
      <form
        action={async (formData) => {
          "use server";
          try {
            await signIn("credentials", formData);
          } catch (error) {
            if (error instanceof AuthError) {
              if (
                error.cause &&
                error.cause.err &&
                error.cause.err instanceof CredentialsSignin
              ) {
                return redirect(`/login?error=${error.cause.err.code}`);
              }
            }

            throw error;
          }
        }}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">
          <span>Login</span>
        </button>
      </form>
      {searchParams.error && <p>{searchParams.error}</p>}
    </div>
  );
}
