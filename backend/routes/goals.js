
const express = require('express');
const router = express.Router();
const goalsController = require('../controllers/goals');

router.get('/', goalsController.all);
router.post('/', goalsController.create);
router.get('/:id', goalsController.single);
router.put('/:id', goalsController.update);
router.delete('/:id', goalsController.delete);

module.exports = router;
