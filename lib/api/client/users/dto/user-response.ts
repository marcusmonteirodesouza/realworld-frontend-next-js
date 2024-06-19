interface UserResponseUser {
  user: {
    email: string;
    username: string;
    token: string;
    bio: string | null | undefined;
    image: string | null | undefined;
  };
}

export class UserResponse {
  constructor(
    readonly status: number,
    readonly body: UserResponseUser,
  ) {}
}
