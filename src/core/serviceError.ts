const NOT_FOUND = 'NOT_FOUND';
const UNAUTHORIZED = 'UNAUTHORIZED';
const FORBIDDEN = 'FORBIDDEN';

export class ServiceError extends Error {
  code: string;
  details: Record<string, any>;

  constructor(code: string, message: string, details: Record<string, any> = {}) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = 'ServiceError';
  }

  static notFound(message: string, details?: Record<string, any>) {
    return new ServiceError(NOT_FOUND, message, details);
  }

  static unauthorized(message: string, details?: Record<string, any>) {
    return new ServiceError(UNAUTHORIZED, message, details);
  }

  static forbidden(message: string, details?: Record<string, any>) {
    return new ServiceError(FORBIDDEN, message, details);
  }

  get isNotFound() {
    return this.code === NOT_FOUND;
  }

  get isUnauthorized() {
    return this.code === UNAUTHORIZED;
  }

  get isForbidden() {
    return this.code === FORBIDDEN;
  }
}