const habitsController = require('../../../controllers/habits');
const Habit = require('../../../models/habit');
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
  const url = `mongodb+srv://sam:sam@cluster0.py3it.mongodb.net/habit_tracker?retryWrites=true&w=majority`;
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
