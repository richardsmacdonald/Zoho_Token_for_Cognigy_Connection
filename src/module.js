"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const axios = require("axios");
const { createExtension, createNodeDescriptor } = require("@cognigy/extension-tools");

const zohoOAuthConnection = {
  type: "zoho-oauth-post",
  label: "Zoho OAuth POST connection",
  fields: [
    { fieldName: "url" },
    { fieldName: "client_id" },
    { fieldName: "client_secret" },
    { fieldName: "refresh_token" },
    { fieldName: "grant_type" }
  ]
};

const postToZoho = createNodeDescriptor({
  type: "postToZoho",
  defaultLabel: "POST to Zoho",
  fields: [
    {
      key: "connection",
      label: "Zoho connection",
      type: "connection",
      params: { connectionType: "zoho-oauth-post", required: true }
    },
    {
      key: "contextKey",
      label: "Context key for the response",
      type: "cognigyText",
      defaultValue: "zohoResponse",
      params: { required: true }
    }
  ],
  function: async ({ cognigy, config }) => {
    const { context } = cognigy;
    const { connection, contextKey } = config;
    const requiredFields = ["url", "client_id", "client_secret", "refresh_token", "grant_type"];
    const missingFields = requiredFields.filter((field) => !connection || !connection[field]);

    if (missingFields.length > 0) {
      throw new Error("Zoho connection is missing: " + missingFields.join(", "));
    }

    const form = new URLSearchParams();
    form.append("client_id", connection.client_id);
    form.append("client_secret", connection.client_secret);
    form.append("refresh_token", connection.refresh_token);
    form.append("grant_type", connection.grant_type);

    try {
      const response = await axios.post(connection.url, form.toString(), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        timeout: 15000
      });
      context[contextKey] = { success: true, status: response.status, data: response.data };
    } catch (error) {
      context[contextKey] = {
        success: false,
        status: error.response ? error.response.status : null,
        data: error.response ? error.response.data : null,
        message: error.message
      };
      throw new Error("Zoho POST request failed: " + error.message);
    }
  }
});

exports.default = createExtension({
  nodes: [postToZoho],
  connections: [zohoOAuthConnection]
});
