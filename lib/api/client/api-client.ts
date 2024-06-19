import { Users } from "./users";

class ApiClient {
  readonly users: Users;

  constructor(apiBaseUrl: string) {
    this.users = new Users(apiBaseUrl);
  }
}

const apiClient = new ApiClient(process.env.API_BASE_URL!);

export { apiClient };
