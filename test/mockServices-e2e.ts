export const mockPlanetRepository = {
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  save: jest.fn(),
};

const mockEntityRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  findOneOrFail: jest.fn(),
};
export const mockFilmRepository = mockEntityRepository;
export const mockPeopleRepository = mockEntityRepository;
export const mockUserRepository = mockEntityRepository;
