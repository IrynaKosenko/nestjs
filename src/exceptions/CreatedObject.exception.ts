import { HttpException, HttpStatus } from '@nestjs/common';

export class CreatedObjectException extends HttpException {
  constructor(message?: string, status?: HttpStatus) {
    super(message || 'The created object must contain all the required fields.', HttpStatus.BAD_REQUEST);
  }
}
