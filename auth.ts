import NextAuth, { CredentialsSignin } from "next-auth"
import { Provider } from "next-auth/providers";
import Credentials from 'next-auth/providers/credentials'

class InvalidLoginError extends CredentialsSignin {
  code = "invalidLogin"
}

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: {
        required: true
      },
      password: {
        required: true,
        type: 'password'
      }
    },
    authorize: async (credentials) => {
      const {email, password} = credentials;

      if (!email || !password) {
        throw new InvalidLoginError();
      }

      const loginUserResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        })
      });

      const loginUserResponseBody = await loginUserResponse.json();

      if (!loginUserResponse.ok) {
        throw new InvalidLoginError();
      }

      return loginUserResponseBody;
    }
  }),
]

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return {id: providerData.id, name: providerData.name}
  } else {
    return {id: provider.id, name: provider.name}
  }
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: "/login"
  }
})
