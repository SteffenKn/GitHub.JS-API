'use strict';
const Github = require('../dist/Github.js');

const argv = require('optimist').argv;
const chai = require('chai'); 
const expect = chai.expect;

const github = new Github.GithubApi();

const authTokenSet = argv.authToken !== undefined;
if (authTokenSet) {
  github.authToken = argv.authToken;
}

describe ('User Tests', () => {
  it ('Should be able to create an user', async () => {
    const user = github.getUser("SteffenKn");

    const userData = await user.asJson();
    const userName = userData['name'];

    expect(userName).to.equal('Steffen Knaup');
  });

  it ('Should be able to get data from an user', async () => {
    const user = github.getUser("SteffenKn");

    const userData = await user.asJson();
    const userName = userData['name'];

    expect(userName).to.equal('Steffen Knaup');
  });

  it ('Should not be able to get data from an invalid user', (done) => {
    github.getUser("Not-Existing-User").asJson()
    .then(() => {
      done('Did not throw an error');
    })
    .catch((error) => {
      const expectedErrorMessage = 'Not Found';

      const isCorrectError = error.message === expectedErrorMessage;
      if(isCorrectError){
        done();
      } else {
        done(`Wrong error was thrown. Expected: "${expectedErrorMessage}", but got "${error.message}"`);
      }
    });
  });

  it ('Should be able to create a repo', () => {
    const user = github.getUser("SteffenKn");
    const repo = user.getRepo('Cloudflare-DDNS-Sync');

    expect(repo.name).to.equal('Cloudflare-DDNS-Sync');
  });
});
