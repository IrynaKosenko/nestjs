import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from 'src/image/entities/image.entity';
import { ConfigService } from '@nestjs/config';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Person } from 'src/people/entities/person.entity';
import { createNewFileName, getMaxId } from 'src/common/common-functions';
import { Planet } from 'src/planet/entities/planet.entity';
import { Film } from 'src/film/entities/film.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starship } from 'src/starship/entities/starship.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { EntityNotFoundException } from 'src/exceptions/NotFound.exception';
import { entities } from 'src/common/constants';

@Injectable()
export class ImageService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    },
  });

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Person)
    private readonly peopleRepository: Repository<Person>,
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,
    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Starship)
    private readonly starshipRepository: Repository<Starship>,
  ) {}

  async uploadImage(fileName: string, file: Buffer, entityParam: string, id: number) {
    fileName = await createNewFileName(fileName, entityParam, id, this.imageRepository);
    const maxImageId = (await getMaxId(entities.images, this.imageRepository)) + 1;

    let newImage = {};

    switch (entityParam) {
      case entities.people:
        if (!(await this.peopleRepository.exist({ where: { id: id } })))
          throw new EntityNotFoundException('Person');
        newImage = this.imageRepository.create({
          id: maxImageId,
          name: fileName,
          url: this.createURLForAWS(fileName),
          person: await this.peopleRepository
            .createQueryBuilder(entities.people)
            .where('id = :id', { id: id })
            .getOne(),
        });
        break;
      case entities.planets:
        if (!(await this.planetRepository.exist({ where: { id: id } })))
          throw new EntityNotFoundException('Planet');
        newImage = this.imageRepository.create({
          id: maxImageId,
          name: fileName,
          url: this.createURLForAWS(fileName),
          planet: await this.planetRepository
            .createQueryBuilder(entities.planets)
            .where('id = :id', { id: id })
            .getOne(),
        });
        break;
      case entities.films:
        if (!(await this.filmRepository.exist({ where: { id: id } })))
          throw new EntityNotFoundException('Film');
        newImage = this.imageRepository.create({
          id: maxImageId,
          name: fileName,
          url: this.createURLForAWS(fileName),
          film: await this.filmRepository
            .createQueryBuilder(entities.films)
            .where('id = :id', { id: id })
            .getOne(),
        });
        break;
      case entities.species:
        if (!(await this.speciesRepository.exist({ where: { id: id } })))
          throw new EntityNotFoundException('Species');
        newImage = this.imageRepository.create({
          id: maxImageId,
          name: fileName,
          url: this.createURLForAWS(fileName),
          species: await this.speciesRepository
            .createQueryBuilder(entities.species)
            .where('id = :id', { id: id })
            .getOne(),
        });
        break;
      case entities.starships:
        if (!(await this.starshipRepository.exist({ where: { id: id } })))
          throw new EntityNotFoundException('Starship');
        newImage = this.imageRepository.create({
          id: maxImageId,
          name: fileName,
          url: this.createURLForAWS(fileName),
          starship: await this.starshipRepository
            .createQueryBuilder(entities.starships)
            .where('id = :id', { id: id })
            .getOne(),
        });
        break;
      case entities.vehicles:
        if (!(await this.vehicleRepository.exist({ where: { id: id } })))
          throw new EntityNotFoundException('Vehicle');
        newImage = this.imageRepository.create({
          id: maxImageId,
          name: fileName,
          url: this.createURLForAWS(fileName),
          vehicle: await this.vehicleRepository
            .createQueryBuilder(entities.vehicles)
            .where('id = :id', { id: id })
            .getOne(),
        });
        break;
      default:
        throw new EntityNotFoundException('Entity');
    }
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.getOrThrow<string>('BUCKET_NAME'),
        Key: fileName,
        Body: file,
      }),
    );
    return await this.imageRepository.save(newImage);
  }

  createURLForAWS(fileName: string): string {
    const bucketName = this.configService.getOrThrow<string>('BUCKET_NAME');
    return `https://${bucketName}.s3.eu-north-1.amazonaws.com/${fileName}`;
  }

  async deleteAllImagesForEntity(id: number, entities: string) {
    const arrayAllImages = await this.imageRepository.find();

    const imagesToDelete = arrayAllImages.filter((element) =>
      element.name.includes(`${entities}_${id}`),
    );

    imagesToDelete.map((elem) => {
      this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.configService.getOrThrow<string>('BUCKET_NAME'),
          Key: elem.name,
        }),
      );
    });

    return await this.imageRepository.remove(imagesToDelete);
  }

  async deleteImage(imageName: string) {
    const image = await this.imageRepository.findOneOrFail({
      where: {
        name: imageName,
      },
    });

    if (!image) throw new EntityNotFoundException('Image');

    this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.configService.getOrThrow<string>('BUCKET_NAME'),
        Key: imageName,
      }),
    );
    return await this.imageRepository.remove(image);
  }
}
