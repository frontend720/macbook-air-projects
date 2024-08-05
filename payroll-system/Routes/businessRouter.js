const express = require("express");
const businessRouter = express.Router();
const admin = require("firebase-admin");
const app = require("../config");
const { v4: uuidv4 } = require("uuid");

const db = admin.firestore(app);

businessRouter.post("/", (request, response) => {
  const business_id = uuidv4();
  const data = {
    business_name: request.body.business_name,
    business_address: {
      street: request.body.street,
      city: request.body.city,
      state: request.body.state,
      zipCode: request.body.zipCode,
      country: request.body.country,
    },
    phone: request.body.phone,
    email: request.body.email,
    taxId: {
      federalTaxId: request.body.federalTaxId,
      stateTaxId: request.body.stateTaxId,
    },
    legalStructure: request.body.legalStructure, // Corporation, LLC, partnership, etc.
    banking_information: {
      bankName: request.body.bankName,
      accountNaumber: request.body.accountNaumber,
      routingNumber: request.body.routingNumber,
    },
    businessId: business_id,
  };
  const businessReference = db
    .collection("business")
    .doc(request.body.business_name)
    .set(data);
  businessReference
    .then((business) => {
      if (!request.body.business_name) {
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

businessRouter.get("/:businessId", (request, response) => {
  const business_id = request.params.businessId;
  const businessRef = db.collection("business").doc(business_id).get();
  businessRef
    .then((business) => {
      if (!business.exists) {
        response.status(400).send({
          message:
            "Your search is like a black hole - it sucked in nothing! 🕳️",
        });
      } else {
        response.status(200).send(business.data());
      }
    })
    .catch((error) => {
      response.status(500).send({
        message:
          "Uh-oh, our servers are having a panic attack! We're sending in the tech ninjas.",
      });
    });
});

businessRouter.put("/:businessId", (request, response) => {
  const business_id = request.params.businessId;
  const data = {
    business_name: request.body.business_name,
    business_address: {
      street: request.body.street,
      city: request.body.city,
      state: request.body.state,
      zipCode: request.body.zipCode,
      country: request.body.country,
    },
    phone: request.body.phone,
    email: request.body.email,
    taxId: {
      federalTaxId: request.body.federalTaxId,
      stateTaxId: request.body.stateTaxId,
    },
    legalStructure: request.body.legalStructure, // Corporation, LLC, partnership, etc.
    banking_information: {
      bankName: request.body.bankName,
      accountNaumber: request.body.accountNaumber,
      routingNumber: request.body.routingNumber,
    },
  };
  const businessReference = db
    .collection("business")
    .doc(business_id)
    .set(data, { merge: true });
  businessReference
    .then((business) => {
      if (!business_id) {
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

businessRouter.delete("/:businessId", (request, response) => {
  const business_id = request.params.businessId;
  const businessReference = db.collection("business").doc(business_id).delete();
  businessReference
    .then((business) => {
      if (!business) {
        response
          .status(400)
          .send({
            message:
              "Looks like something's missing! Please double-check the required information.",
          });
      } else {
        response
          .status(200)
          .send({ message: "Success! Your information has been deleted" });
      }
    })
    .catch((error) => {
      response
        .status(500)
        .send({
          message:
            "Uh-oh, our servers are having a panic attack! We're sending in the tech ninjas.",
        });
    });
});

module.exports = businessRouter;
