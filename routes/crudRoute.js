const router = require('express').Router();
const userController = require('../controller/crudController');

router.route('/user').post(userController.saveUser)
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router;