
const asyncHandler = require('express-async-handler');
const Goal = require('../models/goal');

module.exports = {
    all: asyncHandler(async (req, res) => {
        const goals = await Goal.find();

        return res.status(200).json({
            success: true,
            data: goals,
            message: 'Goals'
        });
    }),
    create: asyncHandler(async (req, res) => {
        if (!req.body.text) {
            return res.status(400).json({
                success: false,
                message: 'Text is required!'
            });
        }

        const goal = await Goal.create(req.body);

        return res.status(200).json({
            success: true,
            data: goal,
            message: 'Goal created successfully.'
        });
    }),
    single: asyncHandler(async (req, res) => {
        const id = req.params?.id;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            const goal = await Goal.findById(id);
            if (goal) {
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
    }),
    update: asyncHandler(async (req, res) => {
        if (!req.body.text) {
            return res.status(400).json({
                success: false,
                message: 'Text is required!'
            });
        }

        const id = req.params?.id;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            const goal = await Goal.findByIdAndUpdate(id, req.body, { new: true });
            if (goal) {
                return res.status(200).json({
                    success: true,
                    data: goal,
                    message: `Goal with id ${id} updated.`
                });
            }
        }

        return res.status(404).json({
            success: false,
            message: `Goal not found!`
        });
    }),
    delete: asyncHandler(async (req, res) => {
        const id = req.params?.id;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            const goal = await Goal.findByIdAndDelete(id);
            if (goal) {
                return res.status(200).json({
                    success: true,
                    data: {
                        id: goal._id,
                    },
                    message: `Goal with id ${id} deleted.`
                });
            }
        }

        return res.status(404).json({
            success: false,
            message: `Goal not found!`
        });
    }),
}
