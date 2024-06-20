import NextAuth, { AppUser, CredentialsSignin, User } from "next-auth"
import { Provider } from "next-auth/providers";
import Credentials from 'next-auth/providers/credentials'
import { jwtDecode } from "jwt-decode";

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

      const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        })
      });

      const loginResponseBody = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new InvalidLoginError();
      }

      const {user: loginResponseUser} = loginResponseBody;

      const user: AppUser = {
        email: loginResponseUser.email,
        image: loginResponseUser.image,
        token: loginResponseUser.token,
        username: loginResponseUser.username,
      }

      return user;
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
  },
  session: {
    // 30 minutes. Should be same as configured in the backend.
    maxAge: 30 * 60, 
  },
  callbacks: {
    jwt: async ({token, user}) => {
      const appUser = user as AppUser;

      if (appUser && appUser.token) {
        const decodedUserToken = jwtDecode(appUser.token);

        token.sub = decodedUserToken.sub;
        token.email = appUser.email;
        token.exp = decodedUserToken.exp;
        token.iat = decodedUserToken.iat;
        token.jti = decodedUserToken.jti;
        token.name = appUser.username;
        token.picture = appUser.image;

        token.accessToken = appUser.token;

        return token;
      } else if (token.exp && Date.now() < token.exp * 1000) {
        return token;
      } else {
        // TODO(Marcus): See what to when the token is expired an we're using the credentials provider.
        throw new Error(`Token is expired`);
      }
    },
    session: async ({session, token}) => {
      session.user = {
        id: token.sub || "",
        email: token.email || "",
        emailVerified: null,
        name: token.name,
        image: token.picture,
      }

      session.accessToken = token.accessToken as string;

      return session;
    }
  }
})
