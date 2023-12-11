import {
  Controller,
  Post,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  FileTypeValidator,
  ParseFilePipe,
  UseGuards,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { ApiBody, ApiTags, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { EntityInterceptors } from 'src/common/interceptors';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/common/constants';

@Controller('image')
@ApiTags('image')
@ApiBearerAuth()
@UseGuards(RoleGuard)
@Roles(Role.Admin)
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload/entities/:entities/id/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        comment: { type: 'string' },
        outletId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 5000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('entities') entities: string,
    @Param('id') id: number,
  ) {
    await this.imageService.uploadImage(file.originalname, file.buffer, entities, id);
    return { result: 'File uploaded successfully' };
  }

  @Delete('delete-all-images/entities/:entities/id/:id')
  @UseInterceptors(EntityInterceptors)
  async deleteAllImagesForEntity(@Param('id') id: number, @Param('entities') entities: string) {
    return await this.imageService.deleteAllImagesForEntity(id, entities);
  }

  @Delete('/delete-image/filename/:filename')
  @UseInterceptors(EntityInterceptors)
  async deleteImage(@Param('filename') filename: string) {
    return await this.imageService.deleteImage(filename);
  }
}
