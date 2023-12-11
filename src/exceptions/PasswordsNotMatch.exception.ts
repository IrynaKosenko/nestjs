import { HttpException, HttpStatus } from '@nestjs/common';

export class PasswordNotMatchException extends HttpException {
  constructor(message?: string, status?: HttpStatus) {
    super(message || 'Passwords doesn`t match!', HttpStatus.BAD_REQUEST);
  }
}
