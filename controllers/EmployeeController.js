const Employee = require("../models/Employee");
//const Users = require("../models/users");

const bcrypt = require("bcrypt");
const Users = require("../models/users");

const signUp = (req, res, next) => {
  const { username, password } = req.body;

  // Generate a salt and hash the password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }

    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }

      // Create a new user with the hashed password
      const user = new Users({
        username: username,
        password: hash,
      });

      // sssSave the user to the database6678hg
      user
        .save()
        .then((response) => {
          res.status(201).json({ message: "User created successfully" });
        })
        .catch((error) => {
          res.status(500).json({ message: "An error occurred" });
        });
    });
  });
};

//show the list employees

const index = (req, res, next) => {
  Employee.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        messsage: "An Error Occurred!",
      });
    });
};

const show = (req, res, next) => {
  const employeeId = req.body.employeeId;

  Employee.findById(employeeId)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        messsage: "An Error Occurred!",
      });
    });
};
//add an employee
const store = (req, res, next) => {
  let employee = new Employee({
    name: req.body.name,
    destination: req.body.destination,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  });

  if (req.file) {
    employee.avatar = req.file.path;
  }

  //use below snippet if you need to upload multiple img

  // if (req.files) {
  //   let path = "";
  //   req.files.foreach((files, index, arr) => {
  //     path = path + files.path + ",";
  //   });
  //   path = path.substring(0, path.lastIndexOf(","));
  //   employee.avatar = path;
  // }

  employee
    .save()
    .then((response) => {
      res.json({
        meassage: "employee Added Successfully",
      });
    })
    .catch((error) => {
      res.json({
        messsage: "An Error Occurred!",
      });
    });
};

//update an employee
const update = (req, res, next) => {
  const employeeId = req.body.employeeId;
  const updatedData = {
    name: req.body.name,
    destination: req.body.destination,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  };

  Employee.findByIdAndUpdate(employeeId, { $set: updatedData })
    .then((response) => {
      res.json({
        meassage: "employee updated Successfully",
      });
    })
    .catch((error) => {
      res.json({
        messsage: "An Error Occurred!",
      });
    });
};

//delete an employee
const destroy = (req, res, next) => {
  const employeeId = req.body.employeeId;
  Employee.findByIdAndRemove(employeeId)
    .then((response) => {
      res.json({
        meassage: "employee deleted Successfully",
      });
    })
    .catch((error) => {
      res.json({
        messsage: "An Error Occurred!",
      });
    });
};

module.exports = {
  index,
  show,
  update,
  store,
  destroy,
  signUp,
};
