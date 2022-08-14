
const asyncHandler = require('express-async-handler');

module.exports = {
    all: asyncHandler(async (req, res) => {
        return res.status(200).json({
            success: true,
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

        return res.status(200).json({
            success: true,
            message: 'New Goal created successfully.'
        });
    }),
    single: asyncHandler(async (req, res) => {
        return res.status(200).json({
            success: true,
            message: `Goal with id ${req.params.id} found.`
        });
    }),
    update: asyncHandler(async (req, res) => {
        return res.status(200).json({
            success: true,
            message: `Goal with id ${req.params.id} updated successfully.`
        });
    }),
    delete: asyncHandler(async (req, res) => {
        return res.status(200).json({
            success: true,
            message: 'Goal deleted successfully.'
        });
    }),
}
