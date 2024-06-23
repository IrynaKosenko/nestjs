import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFoundException extends HttpException {
  constructor(entity?: string, message?: string) {
    super(message || `${entity} not found in database.`, HttpStatus.NOT_FOUND);
  }
}
