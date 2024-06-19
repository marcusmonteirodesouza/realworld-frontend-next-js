interface ErrorResponseErrors {
  errors: {
    body: string[];
  };
}

export class ErrorResponse {
  constructor(
    readonly status: number,
    readonly body: ErrorResponseErrors,
  ) {}
}
