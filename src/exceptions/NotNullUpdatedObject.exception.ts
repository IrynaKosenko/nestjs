import { HttpException, HttpStatus } from '@nestjs/common';

export class NotNullUpdatedObjectException extends HttpException {
  constructor(message?: string) {
    super(
      message || 'The object to update cannot be empty. You need to fill in at least one field.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
