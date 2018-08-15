const express = require('express');
const router = express.Router();
const controller = require('../controllers/position.controller');

router.get('/:category', controller.getByCategory);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;