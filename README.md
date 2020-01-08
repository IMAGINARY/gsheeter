# gSheeter

Read Google Sheets as JSON data.

This is a thin wrapper around the [google-spreadsheet](https://www.npmjs.com/package/google-spreadsheet) npm module
with simplified (Promise based) usage and instructions to cover our most common cases.

## Usage

```
const GSheeter = require('@imaginary-maths/gsheeter');
GSheeter.get(
    spreadsheetID,
    worksheetID
).then((data) => {
  // ...
});

```

**Arguments:**

- **spreadsheetID**: The first long alphanumeric string in the sheet's URL. 
- **worksheetID**: The worksheet number, starting from 1.

**Returns:** An array of objects (one per row) with properties based on the columns (named after the text on the
first row). 

NOTE: The Google Spreadsheets API might add an `id` property to returned rows, which will be
overriden if any of the columns is named `id`.

## Google Sheet format

The first row should contain column names. The names will be mangled if they include spaces, capitals or symbols. It's
recommended to use compatible column names from the start (all lowercase alphanumeric characters).

If the sheet has a completely empty row any rows underneath it will not be read.

Feel free to use formatting, it won't affect read values.

You can use formulas in the sheet, but you'll only access the calculated values.  

## Accessing Google Spreadsheets

### Public access (no credentials)

To open a Google Spreadsheet without authenticating it must be explicitly published 
using the `File > Publish to the web` menu option (in Google Sheets). It's not enough
to make the sheet publicly accessible through the regular sharing settings.

### Protected sheets

To access protected (not public) sheets we can create a service account and give it access to the sheet. The procedure
is as follows:

1. Go to the [Google Developers Console](https://console.developers.google.com/project)
2. Select your project or create a new one (and then select it)
3. Enable the Drive API for your project
  - In the sidebar on the left, expand __APIs & auth__ > __APIs__
  - Search for "drive"
  - Click on "Drive API"
  - click the blue "Enable API" button
4. Create a service account for your project
  - In the sidebar on the left, expand __APIs & auth__ > __Credentials__
  - Click blue "Add credentials" button
  - Select the "Service account" option
  - Select "Furnish a new private key" checkbox
  - Select the "JSON" key type option
  - Click blue "Create" button
  - your JSON key file is generated and downloaded to your machine (__it is the only copy!__)
  - note your service account's email address (also available in the JSON key file)
5. Share the doc (or docs) with your service account using the email noted above

After this use the account's email address to explicitly give it read access to the sheet through its Share button,
as if this was the email address of a regular user you're sharing it with.

See the 
[README file of the google-spreadsheet module repo](https://github.com/theoephraim/node-google-spreadsheet) for
instructions for environments where a local file cannot be saved (like HEROKU).

**IMPORTANT**: Make sure to add the JSON credentials file to `.gitignore` to avoid storing it in the repository.

## More information

For more information on accessing Google Spreadsheets see the 
[README file of the google-spreadsheet module repo](https://github.com/theoephraim/node-google-spreadsheet).

## License

Copyright (c) 2020 IMAGINARY gGmbH

Licensed under the MIT license. See the LICENSE file.
