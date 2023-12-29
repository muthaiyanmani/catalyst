"use strict";

const express = require("express");
const catalyst = require("zcatalyst-sdk-node");

const app = express();
app.use(express.json());

app.get("/send", async (req, res) => {
  const catalystApp = catalyst.initialize(req);
  const userDetails = await catalystApp.userManagement().getCurrentUser();
  if (!userDetails) {
    return res.status(401).json({ message: "User not logged in" });
  }
	
  catalystApp
    .pushNotification()
    .web()
    .sendNotification("Hey! this is a test notification", [
      userDetails?.email_id
    ]);
  return res.status(200).json({ message: "Notification sent" });
});

module.exports = app;
