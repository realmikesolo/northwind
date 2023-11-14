import { HttpStatus } from './http-status';

export class HttpException extends Error {
  public readonly status: number;
  public readonly body: object;

  constructor(status: number, body: object) {
    super('HttpException');

    this.status = status;
    this.body = body;
  }
}

export class BadRequestException extends HttpException {
  constructor(message = 'BAD_REQUEST') {
    super(HttpStatus.BAD_REQUEST, { message, success: false });
  }
}

export class UnauthorizedException extends HttpException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, { message: 'UNAUTHORIZED', success: false });
  }
}

export class ForbiddenException extends HttpException {
  constructor() {
    super(HttpStatus.FORBIDDEN, { message: 'FORBIDDEN', success: false });
  }
}

export class NotFoundException extends HttpException {
  constructor(message = 'NOT_FOUND') {
    super(HttpStatus.NOT_FOUND, { message, success: false });
  }
}

export class ConflictException extends HttpException {
  constructor(message = 'CONFLICT') {
    super(HttpStatus.CONFLICT, { message, success: false });
  }
}

export class InternalServerErrorException extends HttpException {
  constructor() {
    super(HttpStatus.INTERNAL_SERVER_ERROR, { message: 'INTERNAL_SERVER_ERROR', success: false });
  }
}
