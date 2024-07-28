import React, { useState, useEffect } from "react";
import app from "./config";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import "./Vault.css";

export default function Vault({ key, display, style }) {
  const db = getFirestore(app);

  //   const [collectionArr, setCollectionArr] = useState([]);
  const collectionArr = [];

  console.log(display);
  useEffect(() => {
    function passwordCollection() {
      const snapshot = getDocs(collection(db, "passwords"));
      snapshot
        .then((passwords) => {
          if (!passwords.docs) {
            console.log("No passwords to retrieve");
          } else {
            passwords.forEach((doc) => {
              // collectionArr.push(doc.data());

              collectionArr.push(doc.data());
            });
          }
        })
        .catch((error) => {
          console.log(error); 
        });
    }
    passwordCollection();
  }, []);

  console.log(collectionArr);

  return (
    <div style={style} key={display} className="container">
      {collectionArr.map((pass) => (
        <ul className="password-card" key={uuidv4()}>
          <li>{pass.website}</li>
          <li>{pass.username}</li>
          <li>{pass.password}</li>
        </ul>
      ))}
    </div>
  );
}
