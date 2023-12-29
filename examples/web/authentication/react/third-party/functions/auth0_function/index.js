"use strict";
const axios = require("axios");
const express = require("express");
const catalyst = require("zcatalyst-sdk-node");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/authorize", async (req, res) => {
  // eslint-disable-next-line no-case-declarations
  const auth0Token = req.headers["zc-customauth"];
  if (auth0Token != undefined) {
    const auth0Domain =
      "https://" + "dev-71g4maaesm6h88fj.us.auth0.com" + "/userinfo";
    const config = {
      headers: {
        Authorization: "Bearer " + auth0Token
      }
    };

    try {
      const resp = await axios.get(auth0Domain, config);
      const catalystApp = catalyst.initialize(req);
      const userManagement = catalystApp.userManagement();
      const tokenObj = await userManagement.generateCustomToken({
        type: "web",
        user_details: {
          email_id: resp.data.email,
          first_name: resp.data.given_name,
          last_name: resp.data.family_name
        }
      });
      res.send(JSON.stringify(tokenObj));
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send("Not Authorized");
  }
});

module.exports = app;
