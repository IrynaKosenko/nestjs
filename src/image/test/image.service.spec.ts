import { Test, TestingModule } from '@nestjs/testing';
import { ImageService } from '../image.service';
import { Repository } from 'typeorm';
import { Image } from '../entities/image.entity';
import { mockImageRepository, mockImageService } from './image.mock.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityNotFoundException } from '../../exceptions/NotFound.exception';

describe('ImageService', () => {
  let imageService: ImageService;
  let imageRepository: Repository<Image>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ImageService,
          useValue: mockImageService,
        },
        {
          provide: getRepositoryToken(Image),
          useValue: mockImageRepository,
        },
      ],
    }).compile();

    imageService = module.get<ImageService>(ImageService);
    imageRepository = module.get<Repository<Image>>(getRepositoryToken(Image));
  });

  it('should be defined', () => {
    expect(imageService).toBeDefined();
  });
  it('should be defined', () => {
    expect(imageRepository).toBeDefined();
  });

  describe('UPLOAD', () => {
    let buffer = Buffer.from('hello world', 'utf8');
    let img: Image;

    beforeEach(async () => {
      img = await imageService.uploadImage('name', buffer, 'entity', 1);
    });

    it('should call uploadImage() method imageService', async () => {
      expect(imageService.uploadImage).toHaveBeenCalled();
    });

    it('should call imageRepository.create with expected params', async () => {
      //const createRepoSpy = jest.spyOn(imageRepository, 'create');
      imageRepository.create(new Image());
      expect(imageRepository.create).toHaveBeenCalledWith(new Image());
    });

    it('should call imageRepository.save with expected params', async () => {
      imageRepository.create(new Image());
      expect(imageRepository.create).toHaveBeenCalledWith(new Image());
    });

    it('should throw an not found error', async () => {
      jest.spyOn(imageService, 'uploadImage').mockImplementationOnce(() => {
        throw new EntityNotFoundException('Entity');
      });
    });
  });

  describe('DELETE', () => {
    beforeEach(async () => {
      await imageService.deleteImage('image');
      await imageService.deleteAllImagesForEntity(1, 'entity');
    });
    it('should call deleteImage() method imageService', () => {
      expect(imageService.deleteImage).toBeCalledWith('image');
    });

    it('should call deleteAllImagesForEntity() method imageService', () => {
      expect(imageService.deleteAllImagesForEntity).toBeCalledWith(1, 'entity');
    });

    it('should throw an error', async () => {
      jest.spyOn(imageService, 'deleteImage').mockImplementationOnce(() => {
        throw new EntityNotFoundException('Image');
      });
    });
  });
});
