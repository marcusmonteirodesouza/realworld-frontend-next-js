import { ErrorResponse } from "../errors";
import { LoginRequest, RegisterUserRequest, UserResponse } from "./dto";

export class Users {
  constructor(private readonly apiBaseUrl: string) {}

  async registerUser(
    request: RegisterUserRequest,
  ): Promise<UserResponse | ErrorResponse> {
    const url = `${this.apiBaseUrl}/users`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const responseBody = await response.json();

    if (response.ok) {
      return new UserResponse(response.status, responseBody);
    } else {
      return new ErrorResponse(response.status, responseBody);
    }
  }

  async login(request: LoginRequest): Promise<UserResponse | ErrorResponse> {
    const url = `${this.apiBaseUrl}/users/login`;

    console.log(JSON.stringify(request));

    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const responseBody = await response.json();

    if (response.ok) {
      return new UserResponse(response.status, responseBody);
    } else {
      return new ErrorResponse(response.status, responseBody);
    }
  }
}
