import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

/*var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const User = require("../models/userModel");*/

/*
exports.create = (req, res) => {

  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).send({
      message: "Required field can not be empty",
    });
  }

  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    name: req.body.name,
    isActive: req.body.isActive,
  });

  user.save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};


exports.findAll = (req, res) => {
    User.find()
      .sort({ name: -1 })
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occured",
        });
    });
};


exports.findOne = (req, res) => {
    User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User not found with id " + req.params.id,
          });
        }
        res.status(200).send(user);
        console.log(user);
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Error retrieving user with id " + req.params.id,
        });
    });
};


exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User not found ",
          });
        }
        res.send({ message: "User deleted successfully!" });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Could not delete user ",
        });
      });
};


exports.UpdateUser = (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.name) {
      res.status(400).send({
        message: "required fields cannot be empty",
      });
    }
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "no user found",
          });
        }
        res.status(200).send(user);
      })
      .catch((err) => {
        return res.status(404).send({
          message: "error while updating the post",
        });
      });
};
*/





const secret = 'test';

/*
export function signin(req, res) {
  const email  = req.body.email;
  const password = req.body.password;
  var oldUser;
  //try {
 // const oldUser =User.findOne({ email });
  User.findOne({email},function(err,result){
    if (err){ 
      return res.status(404).json({ message: "User doesn't exist" });
    } 
    else{ 
      oldUser = result;
      solvedin5hours(oldUser); 
    } 
  })
  function solvedin5hours(oldUser){
    bcrypt.compare(password, oldUser.password).then((res) => {
      if(res){
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1m" });
        return res.status(200).json({ result: oldUser, token });
      }else
          return res.status(400).json({ message : "Invalid credentials"});
    });

  }

 // if (!oldUser)
  //  return res.status(404).json({ message: "User doesn't exist" });

  //const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
  //  console.log(isPasswordCorrect);
 /* bcrypt.compare(password, oldUser.password, function (err, res) {
    if (err) {
      // handle error
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (res){
      // Send JWT
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1m" });
    return res.status(200).json({ result: oldUser, token });
  }
});


   // if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

   // const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1m" });

   // res.status(200).json({ result: oldUser, token });
 // } catch (err) {
  //  res.status(500).json({ message: err });
 // }
};*/

export const signin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const repassword = password;

    const hashedPassword = await bcrypt.hash(password, 12);

    const isPasswordCorrect = await bcrypt.compare(repassword, hashedPassword);

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

    res.status(201).json({ result, token });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};