const express = require('express');
const router = express.Router();

const auth = require("./auth");
const habitModel = require('../models/habit')

const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// GET AllHabits
// GET '/all'

router.get("/all",
    auth.protect,
    auth.restrictTo("admin"),
    async (req, res) => {

        const habits = await habitModel.getAllHabits();

        try {
            res.send(habits);
        } catch (error) {
            res.status(500).send(error);
        }
    });

// POST createNewHabit
// POST '/'

function setDaysTimeout(callback, days) {
    // 86400 seconds in a day
    let msInDay = 86400 * 1000;

    let dayCount = 0;
    let timer = setInterval(() => {
        dayCount++;  // a day has passed

        if (dayCount === days) {
            clearInterval(timer);
            callback.apply(this, []);
        }
    }, msInDay);
}

function checkCountPer(day, habitId) {
    setDaysTimeout(async () => {
        console.log('check the count and rep')
        const habitObj = await habitModel.getHabitbyId(habitId)
        if (habitObj.count < habitObj.rep) {
            try {
                const habit = await habitModel.updateHabit(habitId, { count: 0, streak: 0 });
                console.log(`${habitId} has ended its streak:<`)
                console.log(`${habit}`)
            } catch (err) {
                console.log(err)
            }
        }
    }, day)
}

async function retrieveUserId(token) {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    return decoded.id
}

router.post("/",
    auth.protect,
    async (req, res) => {


        const userId = await retrieveUserId(req.cookies.jwt)
        const { title, description, rep, freq } = req.body

        try {
            const habit = await habitModel.createHabit({
                userId: userId,
                title: title,
                description: description,
                freq: freq,
                rep: rep
            });
            switch (habit.freq) {
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
// GET '/'

router.get("/",
    auth.protect,
    async (req, res) => {
        const userId = await retrieveUserId(req.cookies.jwt)
        try {
            const response = await habitModel.getHabitbyUserId(userId);
            res.send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    });

// GET findHbaitByHabitId
// GET '/:habitId'

router.get("/:habitid",
    auth.protect,
    async (req, res) => {

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

router.patch("/:habitid",
    auth.protect,
    async (req, res) => {

        try {
            const habit = await habitModel.updateHabit(req.params.habitid, req.body);
            res.send(habit);
        } catch (error) {
            res.status(500).send(error);
        }
    });

router.patch("/:habitid/add",
    auth.protect,
    async (req, res) => {

    try {
        const habit = await habitModel.getHabitbyId(req.params.habitid);
        const updatedHabit = await habitModel.updateHabit(req.params.habitid, {
            count: habit.count+1, 
            streak: habit.streak+1, 
            total: habit.total+1, 
        });
        res.send(updatedHabit);
    } catch (error) {
        res.status(500).send(error);
    }
});

<<<<<<< HEAD
// PATCH UpdateHabitById
// PATCH '/:id'



router.patch("/:habitid", async (req, res) => {
=======
router.patch("/:habitid/minus",
    auth.protect,
    async (req, res) => {
>>>>>>> d82ec74882bb338aed29b509812bf66d2e101990

    try {
        const habit = await habitModel.getHabitbyId(req.params.habitid);
        const updatedHabit = await habitModel.updateHabit(req.params.habitid, {
            count: habit.count-1, 
            streak: habit.streak-1, 
            total: habit.total-1, 
        });
        res.send(updatedHabit);
    } catch (error) {
        res.status(500).send(error);
    }
});

// DELETE DestroyHabitById
// DELETE '/:id'

router.delete("/:habitid",
    auth.protect,
    async (req, res) => {

        console.log(req.params.habitid)
        try {
            const deleteResponse = await habitModel.deleteHabit(req.params.habitid);
            res.send(deleteResponse);
        } catch (error) {
            res.status(500).send(error);
        }
    });



module.exports = router
