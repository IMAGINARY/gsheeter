/* eslint-disable no-underscore-dangle */
const GoogleSpreadsheet = require('google-spreadsheet');

/**
 * Read a spreadsheet worksheet as an array of JSON objects
 *
 * @param {string} spreadsheetID - The ID of the spreadsheet
 * @param {number} worksheetID - The worksheet number (starting from 1)
 * @param {Object} options
 * @param {Object} options.credentials - Access credentials (see README)
 *
 * @return {Promise<array>}
 */
function get(spreadsheetID, worksheetID, options = {}) {
  const doc = new GoogleSpreadsheet(spreadsheetID);
  const { credentials } = options;

  return new Promise((resolve, reject) => {
    if (options.credentials) {
      doc.useServiceAccountAuth(credentials, (authErr) => {
        if (authErr) {
          reject(authErr);
        } else {
          resolve();
        }
      });
    } else {
      resolve();
    }
  }).then(() => new Promise((resolve, reject) => {
    doc.getRows(worksheetID, (readErr, rows) => {
      if (readErr) {
        reject(readErr);
      } else {
        resolve(rows.map((each) => {
          const item = { ...each };
          // Remove some extra fields added by the API to keep (hopefully) only the ones
          // defined by the user
          delete item.save;
          delete item.del;
          delete item._links;
          delete item._xml;
          return item;
        }));
      }
    });
  }));
}

module.exports = {
  get,
};
