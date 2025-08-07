const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppErr = require('../utils/appError');
const User = require('../models/userModel');
exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render('overview', {
    title: 'All tours',
    tours
  });
});

exports.getTour = async (req, res, next) => {
  const slug = req.params.slug;
  //console.log(slug);
  const tour = await Tour.findOne({ slug }).populate({
    path: 'reviews',
    fields: 'review ratings user'
  });
  if (!tour) {
    return next(new AppErr('There is no tour with this name', 404));
  }
  //console.log(tour);
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
};
exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log Into your account'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.getMyTours = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id });
  const tourIds = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIds } });

  res.status(200).render('overview', {
    title: 'My tours',
    tours
  });
};

exports.updateUser = async (req, res, next) => {
  //console.log('UPDATE', req.body);
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );
  res.status(200).render('account', {
    title: 'Your account',
    user
  });
};

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking') {
    res.locals.alert = 'Your booking is successful!!!';
  }
  next();
};
