const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workouts
const getWorkouts = async (req, res) => {
    // find query
    const workouts = await Workout.find({}).sort( { createdAt: -1 } );

    res.status(200).json(workouts);
}

// get a single workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params;

    // checks if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"});
    }

    // find query
    const workout = await Workout.findById(id);

    // checks if workout exists
    if(!workout){
        return res.status(404).json({error: "No such workout"});
    }

    res.status(200).json(workout);
}


// create a new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body;

    // error check/handling
    let emptyFields = [];

    if(!title) {
        emptyFields.push('title');
    }
    if(!load){
        emptyFields.push('load');
    }
    if(!reps){
        emptyFields.push('reps');
    }
    if(emptyFields.length > 0){
        return res.status(400).json({ error: "Please fill in all the fields", emptyFields });
    }


    // add doc to db
    try {
        // create query
        const workout = await Workout.create({title, load, reps});
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    // checks if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"});
    }

    // delete query
    const workout = await Workout.findOneAndDelete({_id: id});

    // checks if workout exists
    if(!workout){
        return res.status(404).json({error: "No such workout"});
    }

    // success
    res.status(200).json(workout);
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    const { title, reps, load } = req.body;

    // checks if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"});
    }

    // update query
    const workout = await Workout.findOneAndUpdate({_id:id}, {
        ...req.body
    });

    // checks if workout exists
    if(!workout){
        return res.status(404).json({error: "No such workout"});
    }

    // success
    res.status(200).json(workout);
}


module.exports = {
    getWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}