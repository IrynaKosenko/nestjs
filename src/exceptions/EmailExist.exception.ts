import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailExistException extends HttpException {
  constructor(message?: string, status?: HttpStatus) {
    super(message || 'Email already exists', HttpStatus.BAD_REQUEST);
  }
}
