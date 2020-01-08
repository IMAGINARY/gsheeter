/* eslint-disable arrow-body-style */
require('chai').use(require('chai-as-promised')).should();
const GSheeter = require('../');

const publicSpreadsheetID = '142z0_e5ZjNdvhMuxGSzfSeU3w3oE5q7ZJ0RlbZyxSKk';

describe('GSheeter', () => {
  describe('when getting a public spreadsheet', () => {
    it('should read its data', () => {
      return GSheeter.get(
        publicSpreadsheetID,
        1
      ).then((data) => {
        data.should.be.an('array');
        data.length.should.equal(5);
        data[0].should.deep.include({
          code: 'CDG',
          country: 'France',
          lat: '49.0096906',
          lon: '2.5457358',
          name: 'Paris-Charles De Gaulle',
        });
        data[1].should.deep.include({
          code: 'LHR',
          country: 'United Kingdom',
          lat: '51.4700223',
          lon: '-0.4564842',
          name: 'Heathrow Airport',
        });
      });
    });

    it('should fail if the spreadsheet ID is invalid', () => {
      return GSheeter.get(
        'xxxxx_xxxxxdvhMuxGSzfSeU3w3oE5q7ZJ0RlbZyxSKk',
        1
      ).should.be.rejectedWith('Error: HTTP error 400 (Bad Request)');
    });

    it('should fail if the worksheet ID is invalid', () => {
      return GSheeter.get(
        publicSpreadsheetID,
        23
      ).should.be.rejectedWith('Error: HTTP error 400 (Bad Request)');
    });
  });
});
