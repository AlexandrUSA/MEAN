const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/category.controller');

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;