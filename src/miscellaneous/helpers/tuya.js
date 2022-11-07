/*
 * This is the tuya.js file. It contains useful utilities
 * that may be used for the /light command.
 *
 * Some parts of code are taken from Tuya's sign request
 * documentation, available here:
 *
 * https://developer.tuya.com/en/docs/iot/singnature?id=Ka43a5mtx1gsc
 *
 * Made with <3 by Jason
 *
 * Copyright (c) Pix3l_ 2022
 * Code is licensed under MIT
 */

// Import needed modules
const crypto = require("crypto");
const fetch = require("node-fetch");
require("dotenv").config();

// Tuya HMAC-SHA256 encryption algorithm
const encryptStr = async function (str, secret) {
  return crypto
    .createHmac("sha256", secret)
    .update(str, "utf8")
    .digest("hex")
    .toUpperCase();
};

// Fetch login token from API
const getToken = async function () {
  const signUrl = "/v1.0/token?grant_type=1";
  const contentHash = crypto.createHash("sha256").update("").digest("hex");
  const stringToSign = ["GET", contentHash, "", signUrl].join("\n");
  const signStr = process.env.TUYA_ACCS + Date.now().toString() + stringToSign;

  const headers = {
    t: Date.now().toString(),
    sign_method: "HMAC-SHA256",
    client_id: process.env.TUYA_ACCS,
    sign: await encryptStr(signStr, process.env.TUYA_SECR),
  };

  const response = await fetch(
    "https://openapi.tuyaus.com/v1.0/token?grant_type=1",
    {
      method: "GET",
      headers: headers,
    }
  ).then((r) => r.json());

  return response.result.access_token;
};

// Export functions
module.exports.getToken = async function () {
  return await getToken();
};

module.exports.encryptStr = async function (str, secret) {
  return await encryptStr(str, secret);
};
