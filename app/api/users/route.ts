import { NextRequest, NextResponse } from "next/server";
import { ErrorResponse, UserResponse, apiClient } from "@/lib/api/client";

async function registerUser(req: NextRequest) {
  const { email, password, username } = await req.json();

  const registerUserResponse = await apiClient.users.registerUser({
    user: {
      email,
      password,
      username,
    },
  });

  if (registerUserResponse instanceof UserResponse) {
    const { user } = registerUserResponse.body;
    return NextResponse.json({ user }, { status: registerUserResponse.status });
  } else if (registerUserResponse instanceof ErrorResponse) {
    const { errors } = registerUserResponse.body;
    return NextResponse.json(
      { errors },
      { status: registerUserResponse.status },
    );
  }
}

export { registerUser as POST };
