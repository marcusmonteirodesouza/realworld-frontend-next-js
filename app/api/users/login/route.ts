import { NextRequest, NextResponse } from "next/server";
import { ErrorResponse, UserResponse, apiClient } from "@/lib/api/client";

async function login(req: NextRequest) {
  const { email, password } = await req.json();

  const loginResponse = await apiClient.users.login({
    user: {
      email,
      password,
    },
  });

  if (loginResponse instanceof UserResponse) {
    const { user } = loginResponse.body;
    return NextResponse.json({ user }, { status: loginResponse.status });
  } else if (loginResponse instanceof ErrorResponse) {
    const { errors } = loginResponse.body;
    return NextResponse.json({ errors }, { status: loginResponse.status });
  }
}

export { login as POST };
