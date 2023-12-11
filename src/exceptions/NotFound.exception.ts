import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFoundException extends HttpException {
  constructor(entity?: string, message?: string, status?: HttpStatus) {
    super(message || `${entity} not found in database.`, HttpStatus.NOT_FOUND);
  }
}
