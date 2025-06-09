const express = require('express');
const viewsController = require('../controllers/viewsController')
const authC = require('../controllers/authController')
const router = express.Router()

router.get('/',authC.isLoggedIn,viewsController.getOverview )
router.get('/tour/:slug',authC.isLoggedIn,viewsController.getTour)

router.get('/login',authC.isLoggedIn, viewsController.getLoginForm)
router.get('/me',authC.protect, viewsController.getAccount)
router.post('/submit-user-data', authC.protect, viewsController.updateUser)
module.exports = router