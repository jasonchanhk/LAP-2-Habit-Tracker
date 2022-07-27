const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/user');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

exports.getAllUsers = catchAsync(async (req, res) => {
  const user = await User.find(req.body);

  if (!user) {
    return next(new AppError('No user found', 404));
  }
  //SEND RESPONSE//
  res.status(200).json({
    status: 'success',
    results: user.length,
    data: {
      user,
    },
  });
});

exports.getOneUser = catchAsync(async (req, res) => {
  const decoded = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRET
  );
  const user = await User.find({ _id: decoded.id });

  if (!user) {
    return next(new AppError('No user found', 404));
  }
  //SEND RESPONSE//
  res.status(200).json({
    status: 'success',
    results: user.length,
    data: {
      user,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: 'Invalid data sent!' });
  }
};
