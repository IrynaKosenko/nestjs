import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailExistException extends HttpException {
  constructor(message?: string) {
    super(message || 'Email already exists', HttpStatus.CONFLICT);
  }
}
