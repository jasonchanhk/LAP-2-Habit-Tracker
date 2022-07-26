const express = require('express');
const router = express.Router();

const habitModel = require('../models/habit')

// GET AllHabits
// GET '/'

router.get("/", async (req, res) => {
    const habits = await habitModel.getAllHabits();

    try {
        res.send(habits);
    } catch (error) {
        res.status(500).send(error);
    }
});

// POST createNewHabit
// POST '/'

function setDaysTimeout(callback,days) {
    // 86400 seconds in a day
    let msInDay = 86400*1000; 

    let dayCount = 0;
    let timer = setInterval(() => {
        dayCount++;  // a day has passed

        if (dayCount === days) {
           clearInterval(timer);
           callback.apply(this, []);
        }
    }, msInDay);
}

function checkCountPer(day, habitId){
    setDaysTimeout(async () => {
        console.log('check the count and rep')
        const habitObj = await habitModel.getHabitbyId(habitId)
        if(habitObj.count < habitObj.rep){
            try{
                const habit = await habitModel.updateHabit(habitId, {count: 0, streak: 0});
                console.log(`${habitId} has ended its streak:<`)
                console.log(`${habit}`)
            }catch(err){
                console.log(err)
            }
        }
    }, day)
}

router.post("/", async (req, res) => {

    console.log(req.body)
    const { userId, title, description, rep, freq } = req.body

    try {
        const habit = await habitModel.createHabit({
            userId: userId,
            title: title,
            description: description,
            freq: freq,
            rep: rep
        });
        switch(habit.freq){
            case "Daily":
                checkCountPer(1, habit._id)
            case "Weekly":
                checkCountPer(7, habit._id)
            case "Monthly":
                checkCountPer(30, habit._id)
        }
        res.send(habit);
        
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET findHabitByUserId
// GET '/:userId'

router.get("/userId/:userId", async (req, res) => {

    console.log(req.params.userId)
    try {
        const response = await habitModel.getHabitbyUserId(req.params.userId);
        res.send(response);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET findHbaitByHabitId
// GET '/:habitId'

router.get("/:habitid", async (req, res) => {

    console.log(req.params.habitid)
    try {
        const habit = await habitModel.getHabitbyId(req.params.habitid);
        res.send(habit);
    } catch (error) {
        res.status(500).send(error);
    }
});

// PATCH UpdateHabitById
// PATCH '/:id'

<<<<<<< HEAD
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
=======
router.patch("/:habitid", async (req, res) => {

    try {
        const habit = await habitModel.updateHabit(req.params.habitid, req.body);
        res.send(habit);
    } catch (error) {
        res.status(500).send(error);
    }
});

// DELETE DestroyHabitById
// DELETE '/:id'

router.delete("/:habitid", async (req, res) => {

    console.log(req.params.habitid)
    try {
        const deleteResponse = await habitModel.deleteHabit(req.params.habitid);
        res.send(deleteResponse);
    } catch (error) {
        res.status(500).send(error);
    }
});



module.exports = router
