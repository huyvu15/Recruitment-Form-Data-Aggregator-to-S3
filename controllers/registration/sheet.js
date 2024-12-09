const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const path = require("path");

async function updateSheet(data) {
  const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

  const auth = new google.auth.GoogleAuth({
    keyFile: "./utils/credentials.json",
    scopes: SCOPES,
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  // Sheet ID
  const spreadsheetId = "1yehiFpIz-I7xlpwVd_gFxl2TPGJMgbJon-rX2giOeOg";

  // Get metadata
  const metaData = await googleSheets.spreadsheets.get({
    spreadsheetId,
  });

  // Write data to sheet
  try {
    await googleSheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1", // Chỉ dùng tên sheet
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [data],
      },
    });        
  } catch (err) {
    console.error("Error appending data to sheet:", err);
    return false;
  }
  return true;
}

module.exports = { updateSheet };
