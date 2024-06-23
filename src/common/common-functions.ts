import { ObjectLiteral, Repository } from 'typeorm';
import { entities, url } from './constants';

export function createUrlWithId(id: number, entity: string): string {
  return `${url}${entity}/${id}/`;
}

export async function getMaxId<T extends ObjectLiteral>(
  entity: string,
  repository: Repository<T>,
): Promise<number> {
  const queryBuilder = repository.createQueryBuilder(entity);
  const result = await queryBuilder.select(`MAX(${entity}.id)`, 'maxId').getRawOne();
  return result.maxId;
}

export async function createNewFileName<T extends ObjectLiteral>(
  fileName: string,
  entity: string,
  id: number,
  repo: Repository<T>,
): Promise<string> {
  const ext = fileName.split('.')[1]; // needs to check if file name contains two or more dots
  const maxImageId = (await getMaxId(entities.images, repo)) + 1;
  return maxImageId ? `${entity}_${id}_${maxImageId}.${ext}` : `${entity}_${id}_1.${ext}`;
}
