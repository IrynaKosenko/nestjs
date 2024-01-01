import { Test, TestingModule } from '@nestjs/testing';
import { ImageController } from '../image.controller';
import { ImageService } from '../image.service';
import { mockImageService } from './image.mock.service';
import { EntityNotFoundException } from '../../exceptions/NotFound.exception';

describe('ImageController', () => {
  let imageController: ImageController;
  let imageService: ImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageController],
      providers: [
        {
          provide: ImageService,
          useValue: mockImageService,
        },
      ],
    }).compile();

    imageController = module.get<ImageController>(ImageController);
    imageService = module.get<ImageService>(ImageService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(imageController).toBeDefined();
  });

  describe('UPLOAD', () => {
    let buffer = Buffer.from('hello world', 'utf8');

    it('should call uploadImage() method imageService', async () => {
      await imageService.uploadImage('name', buffer, 'entity', 1);
      expect(imageService.uploadImage).toHaveBeenCalled();
    });
  });

  describe('DELETE', () => {
    beforeEach(async () => {
      await imageService.deleteImage('image');
      await imageService.deleteAllImagesForEntity(1, 'entity');
    });
    it('should call deleteImage() method imageService', () => {
      expect(imageService.deleteImage).toHaveBeenCalled();
      expect(imageService.deleteImage).toBeCalledWith('image');
    });

    it('should call deleteAllImagesForEntity() method imageService', () => {
      expect(imageService.deleteAllImagesForEntity).toHaveBeenCalled();
      expect(imageService.deleteAllImagesForEntity).toBeCalledWith(1, 'entity');
    });

    it('should throw an error', async () => {
      jest.spyOn(imageController, 'deleteImage').mockImplementationOnce(() => {
        throw new EntityNotFoundException('Image');
      });
    });
  });
});
