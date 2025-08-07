const express = require('express');
const viewsController = require('../controllers/viewsController');
const authC = require('../controllers/authController');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
router.use(viewsController.alerts);
router.get(
  '/',
  // bookingController.createBookingCheckout,
  authC.isLoggedIn,
  viewsController.getOverview
);
router.get('/tour/:slug', authC.isLoggedIn, viewsController.getTour);

router.get('/login', authC.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authC.protect, viewsController.getAccount);
router.get('/myTours', authC.protect, viewsController.getMyTours);
router.post('/submit-user-data', authC.protect, viewsController.updateUser);
module.exports = router;
