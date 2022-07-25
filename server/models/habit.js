const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: [200, 'Habit name can only be up to 200 characters']
  },
  description: {
    type: String,
    required: true,
    maxlength: [1000, 'Description can only be up to 1000 characters']
  },
  rep: {
    type: Number,
    min: [1, 'Frequency must be greater than 1'],
    required: true,
  },
  freq: {
    type: String,
    required: false,
    enum: ['Daily', 'Weekly', 'Monthly'],
  },
  count: {
    type: Number,
    min: [0, 'Frequency must be greater or equal to 0'],
    default: 0
  },
  streak:{
    type: Number,
    min: [0],
    default: 0
  },
  total:{
    type: Number,
    min: [0],
    default: 0
  },
},{
    collection: 'habits'
});

const Habit = mongoose.model("habits", HabitSchema);

class HabitService{
    static async getAllHabits(){
        try {
            const allHabits = await Habit.find({});
            return allHabits;
        } catch (error) {
            console.log(`Could not fetch Habits ${error}`)
        }
    }

    static async createHabit(data){
        try {

            const newHabit = {
                userId: data.userId,
                title: data.title,
                description: data.description,
                rep: data.rep,
                freq: data.freq
            }
           const response = await Habit.create(newHabit);
           return response;
        } catch (error) {
            console.log(error);
        } 

    }

    static async getHabitbyId(habitId){
        try {
            const singleHabitResponse =  await Habit.findById({_id: habitId});
            return singleHabitResponse;
        } catch (error) {
            console.log(`Habit not found. ${error}`)
        }
    }

    static async updateHabit(habitId, changes){
            try {
                const updateResponse =  await Habit.findByIdAndUpdate(habitId, changes, {new: true});
                return updateResponse;
            } catch (error) {
                console.log(`Could not update Habit ${error}` );
        }
    }

    static async deleteHabit(habitId){
        try {
            const deletedResponse = await Habit.findOneAndDelete(habitId);
            return deletedResponse;
        } catch (error) {
            console.log(`Could not delete Habit ${error}`);
        }
    }

    static async getHabitbyUserId(userId){
        try {
            const listHabitResponse =  await Habit.find({userId: userId});
            return listHabitResponse;
        } catch (error) {
            console.log(`Habit not found. ${error}`)
        }
    }
}

module.exports = HabitService
