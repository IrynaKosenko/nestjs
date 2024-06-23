export const mockImageService = {
  uploadImage: jest.fn((x) => x),
  deleteAllImagesForEntity: jest.fn((x) => x),
  deleteImage: jest.fn((x) => x),
};

export const mockImageRepository = {
  create: jest.fn(),
  findOneOrFail: jest.fn(),
  find: jest.fn(),
  remove: jest.fn(),
  save: jest.fn(),
};
