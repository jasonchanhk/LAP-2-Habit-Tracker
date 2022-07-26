const express = require('express');
const router = express.Router();

const habitModel = require('../models/habit')

// POST createNewHabit
// POST '/'

router.post("/", async (request, response) => {

    console.log(request.body)
    const { userId, id, title, description, freq, targetFreq, complete, streak } = request.body

    try {
        const habit = await habitModel.create({
            userId: userId,
            id: id,
            title: title,
            description: description,
            freq: freq,
            targetFreq: targetFreq,
            complete: complete,
            streak: streak
        });
        response.send(habit);
    } catch (error) {
        response.status(500).send(error);
    }
});

// GET AllHabits
// GET '/'

router.get("/", async (request, response) => {
    const habits = await habitModel.find({});

    try {
        response.send(habits);
    } catch (error) {
        response.status(500).send(error);
    }
});


// GET findHabitByUserId
// GET '/:userid'

// PATCH UpdateHabitById
// PATCH '/:id'

router.delete("/:id", async (request, response) => {
console.log('this is a test')
    try{
    const habits = await habitModel.delete((request.body), request.params.id);
    response.status(201).send('Deleted');
} catch (err) {
    console.log(err)
    response.status(422).json({err})
} 
})

module.exports = router
