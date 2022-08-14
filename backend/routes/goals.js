
const express = require('express');
const router = express.Router();
const goalsController = require('../controllers/goals');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, goalsController.all);
router.post('/', authMiddleware, goalsController.create);
router.get('/:id', authMiddleware, goalsController.single);
router.put('/:id', authMiddleware, goalsController.update);
router.delete('/:id', authMiddleware, goalsController.delete);

module.exports = router;
