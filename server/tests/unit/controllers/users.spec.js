const habitsController = require('../../../controllers/users');
const Habit = require('../../../models/user');
const mongoose = require('mongoose');
const databaseName = 'test';

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({
  send: mockSend,
  json: mockJson,
  end: jest.fn(),
}));
const mockRes = { status: mockStatus };

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
});
describe('habits controller', () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe('index', () => {
    test('it returns habits with a 200 status code', async () => {
      jest.spyOn(Habit, 'getAllHabits', 'get').mockResolvedValue(testHabits);
      await habitsController.all(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(testHabits);
    });
  });

  describe('all', () => {});
});
