const express = require("express");
const admin = require("firebase-admin");
const employeeRouter = express.Router();
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const app = require("../config");

const db = admin.firestore(app);
db.settings({ ignoreUndefinedProperties: true });

employeeRouter.post("/", (request, response) => {
  const businessId = uuidv4();
  const employee_id = uuidv4();
  const employeeData = {
    name: request.body.name,
    dob: request.body.dob,
    ssn: request.body.ssn,
    address: request.body.address,
    contact_information: request.body.contact_information,
    hire_date: request.body.hire_date,
    termination_date: request.body.termination_date,
    job_title: request.body.job_title,
    department: request.body.department,
    wage: request.body.wage,
    salary: request.body.salary,
    tax_information: request.body.tax_information,
    direct_deposit: request.body.direct_depost,
    emergency: request.body.emergency,
    employee_id: employee_id,
    created_at: moment().format(),
    business_id: businessId,
    location: request.body.location,
    hours_scheduled: request.body.hours_scheduled,
    hours_completed: request.body.hours_completed,
    zone: request.body.zone,
    hr_access: request.body.hr_access,
    zone_access: request.body.zone_access,
  };
  const employeeReference = db
    .collection("business")
    .doc(request.body.business.replaceAll(" ", "-"))
    .collection("employees")
    .doc(employee_id)
    .set(employeeData);
  employeeReference
    .then((data) => {
      if (!request.body.name && !request.body.ssn && !request.body.location) {
        response.status(400).send({
          message:
            "Looks like something's missing! Please double-check the required information.",
        });
      } else {
        response
          .status(200)
          .send({ message: "Success! Your information has been saved." });
      }
    })
    .catch((error) => {
      response.status(500).send({
        message:
          "Uh-oh, our servers are having a panic attack! We're sending in the tech ninjas.",
      });
    });
});

// Define a GET route with parameters: businessId , options, and query

employeeRouter.get("/:businessId/:options/:query", (request, response) => {
  // Initialize an empty array
  const collectionArr = [];

  // Reference the firestore collection for employees within a specific business and location

  const collectionRef = db
    .collection("business")
    .doc(request.params.businessId) // Business name
    .collection("employees")
    .where(request.params.options, "==", request.params.query)

    .get();

  collectionRef
    .then((employees) => {
      if (employees.empty) {
        response.status(400).send({
          message:
            "Your search is like a black hole - it sucked in nothing! 🕳️",
        });
      } else {
        employees.forEach((employee) => {
          collectionArr.push(employee.data());
        });
      }
      response.status(200).send(collectionArr);
    })
    .catch((error) => {
      response.status(500).send({
        message:
          "Uh-oh, our servers are having a panic attack! We're sending in the tech ninjas.",
      });
    });
});

employeeRouter.put("/:business_id/:employee_id", (request, response) => {
  // business_id == business name
  const business_id = request.params.business_id;
  const employee_id = request.params.employee_id;
  const employeeData = {
    name: request.body.name,
    dob: request.body.dob,
    ssn: request.body.ssn,
    address: request.body.address,
    contact_information: request.body.contact_information,
    hire_date: request.body.hire_date,
    termination_date: request.body.termination_date,
    job_title: request.body.job_title,
    department: request.body.department,
    wage: request.body.wage,
    salary: request.body.salary,
    tax_information: request.body.tax_information,
    direct_deposit: request.body.direct_depost,
    emergency: request.body.emergency,
    edited_at: moment().format(),
    location: request.body.location,
    hours_scheduled: request.body.hours_scheduled,
    hours_completed: request.body.hours_completed,
  };
  const employeeReference = db
    .collection("business")
    .doc(business_id)
    .collection("employees")
    .doc(employee_id)
    .set(employeeData, { merge: true });
  employeeReference
    .then((employee) => {
      if (!request.params.business_id || !request.params.employee_id) {
        response.status(400).send({
          message:
            "Looks like something's missing! Please double-check the required information.",
        });
      } else {
        response
          .status(200)
          .send({ message: "Success! Your information has been updated." });
      }
    })
    .catch((error) => {
      response.status(500).send({
        message:
          "Uh-oh, our servers are having a panic attack! We're sending in the tech ninjas.",
      });
    });
});

// Define a DELETE route with parameters business_id and employee_id

employeeRouter.delete("/:business_id/:employee_id", (request, response) => {
  const business_id = request.params.business_id;
  const employee_id = request.params.employee_id;

  const employeeReference = db
    .collection("business")
    .doc(business_id)
    .collection("employees")
    .doc(employee_id)
    .delete();
  employeeReference
    .then((employee) => {
      if (!employee_id && !business_id) {
        response.status(400).send({
          message:
            "Looks like something's missing! Please double-check the required information.",
        });
      } else {
        response
          .status(200)
          .send({ message: "Employee record successfully terminated." });
      }
    })
    .catch((error) => {
      response.status(500).send({
        message:
          "Uh-oh, our servers are having a panic attack! We're sending in the tech ninjas.",
      });
    });
});

module.exports = employeeRouter;
