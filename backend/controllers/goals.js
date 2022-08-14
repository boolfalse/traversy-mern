
module.exports = {
    all: (req, res) => {
        return res.status(200).json({
            success: true,
            message: 'Goals'
        });
    },
    create: (req, res) => {
        return res.status(200).json({
            success: true,
            message: 'New Goal created successfully.'
        });
    },
    single: (req, res) => {
        return res.status(200).json({
            success: true,
            message: `Goal with id ${req.params.id} found.`
        });
    },
    update: (req, res) => {
        return res.status(200).json({
            success: true,
            message: `Goal with id ${req.params.id} updated successfully.`
        });
    },
    delete: (req, res) => {
        return res.status(200).json({
            success: true,
            message: 'Goal deleted successfully.'
        });
    },
}
