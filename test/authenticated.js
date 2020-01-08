/* eslint-disable arrow-body-style */
require('chai').use(require('chai-as-promised')).should();
const GSheeter = require('../');
const credentials = require('./credentials/test-credentials.json');
const invalidCredentials = require('./credentials/invalid-credentials.json');

const protectedSpreadsheetID = '11DyUOwU2AK6ynNvpt3Mf8s7P0lGRxIKzjQ2Iod9v4i8';
const publicSpreadsheetID = '142z0_e5ZjNdvhMuxGSzfSeU3w3oE5q7ZJ0RlbZyxSKk';

describe('GSheeter', () => {
  describe('when reading a protected spreadsheet', () => {
    it('should read its data', () => {
      return GSheeter.get(
        protectedSpreadsheetID,
        1,
        { credentials }
      ).then((data) => {
        data.should.be.an('array');
        data.length.should.equal(4);
        data[0].should.deep.include({
          code: 'JFK',
          country: 'USA',
          lat: '40.6413111',
          lon: '-73.7803278',
          name: 'John F. Kennedy International Airport',
        });
        data[1].should.deep.include({
          code: 'LAX',
          country: 'USA',
          lat: '33.9415889',
          lon: '-118.4107187',
          name: 'Los Angeles International Airport',
        });
      });
    });

    it('should fail if the spreadsheet ID is invalid', () => {
      return GSheeter.get(
        'xxxxx_xxxxxdvhMuxGSzfSeU3w3oE5q7ZJ0RlbZyxSKk',
        1,
        { credentials }
      ).should.be.rejectedWith('Error: HTTP error 400 (Bad Request)');
    });

    it('should fail if the worksheet ID is invalid', () => {
      return GSheeter.get(
        protectedSpreadsheetID,
        23,
        { credentials }
      ).should.be.rejectedWith('Error: HTTP error 400 (Bad Request)');
    });

    it('should fail if credentials are not passed', () => {
      return GSheeter.get(
        protectedSpreadsheetID,
        1
      ).should.be.rejectedWith('Sheet is private.');
    });

    it('should fail if credentials are invalid', () => {
      return GSheeter.get(
        protectedSpreadsheetID,
        1,
        { credentials: invalidCredentials }
      ).should.be.rejectedWith('error');
    });

    it('should still work with public sheets', () => {
      return GSheeter.get(
        publicSpreadsheetID,
        1,
        { credentials }
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
  });
});
