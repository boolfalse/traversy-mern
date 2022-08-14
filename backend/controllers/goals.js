
const asyncHandler = require('express-async-handler');
const Goal = require('../models/goal');

module.exports = {
    all: asyncHandler(async (req, res) => {
        try {
            const goals = await Goal.find({
                user: req.user.id,
            });

            return res.status(200).json({
                success: true,
                data: goals,
                message: 'Goals'
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }),
    create: asyncHandler(async (req, res) => {
        if (!req.body.text) {
            return res.status(400).json({
                success: false,
                message: 'Text is required!'
            });
        }

        try {
            const goal = await Goal.create({
                ...req.body,
                user: req.user.id,
            });

            return res.status(200).json({
                success: true,
                data: goal,
                message: 'Goal created successfully.'
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }),
    single: asyncHandler(async (req, res) => {
        try {
            const id = req.params?.id;
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                const goal = await Goal.findById(id);
                if (goal && goal.user.toString() === req.user.id.toString()) {
                    return res.status(200).json({
                        success: true,
                        data: goal,
                        message: `Goal with id ${id} found.`
                    });
                }
            }

            return res.status(404).json({
                success: false,
                message: `Goal not found!`
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }),
    update: asyncHandler(async (req, res) => {
        if (!req.body.text) {
            return res.status(400).json({
                success: false,
                message: 'Text is required!'
            });
        }

        try {
            const id = req.params?.id;
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                const goal = await Goal.findById(id);
                if (!goal || goal.user.toString() !== req.user.id.toString()) {
                    return res.status(404).json({
                        success: false,
                        message: `Goal not found!`
                    });
                }

                const updatedGoal = await Goal.findByIdAndUpdate(id, {
                    text: req.body.text,
                }, { new: true });

                return res.status(200).json({
                    success: true,
                    data: updatedGoal,
                    message: `Goal with id ${id} updated.`
                });
            }

            return res.status(404).json({
                success: false,
                message: `Goal not found!`
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }),
    delete: asyncHandler(async (req, res) => {
        try {
            const id = req.params?.id;
            if (id.match(/^[0-9a-fA-F]{24}$/)) {
                const goal = await Goal.findById(id);
                if (!goal || goal.user.toString() !== req.user.id.toString()) {
                    return res.status(404).json({
                        success: false,
                        message: `Goal not found!`
                    });
                }

                const deletedGoal = await Goal.findByIdAndDelete(id);

                return res.status(200).json({
                    success: true,
                    data: {
                        id: deletedGoal._id,
                    },
                    message: `Goal with id ${id} deleted.`
                });
            }

            return res.status(404).json({
                success: false,
                message: `Goal not found!`
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }),
}
