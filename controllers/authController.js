const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//import User from "../models/users";
const Users = require("../models/users");

const userLogin = (req, res, next) => {
  const { username, password } = req.body;

  Users.findOne({ username: username })
    .then((user) => {
      // Check if the user exists
      //console.log(user);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials1" });
      }

      // Compare the provided password with the hashed password in the database
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Internal server error" });
        }

        // If passwords match, create a JWT token
        if (result) {
          const token = jwt.sign(
            { id: user._id, username: user.username },
            "secret_key",
            {
              expiresIn: "1h",
            }
          );

          return res.status(200).json({ token });
        }

        // If passwords don't match
        return res.status(401).json({ message: "Invalid credentials2" });
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "An error occurred" });
    });
};

module.exports = userLogin;
