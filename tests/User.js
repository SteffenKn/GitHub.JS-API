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
  it ('Should Be Able to Create an User', async () => {
    const user = github.getUser("SteffenKn");

    const userData = await user.asJson();
    const userName = userData['name'];

    expect(userName).to.equal('Steffen Knaup');
  });

  it ('Should Be Able to Get Data from an User', async () => {
    const user = github.getUser("SteffenKn");

    const userData = await user.asJson();
    const userName = userData['name'];

    expect(userName).to.equal('Steffen Knaup');
  });

  it ('Should Not Be Able to Get Data from an Invalid User', (done) => {
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

  it ('Should Be Able to Create a Repo', () => {
    const user = github.getUser("SteffenKn");
    const repo = user.getRepo('Cloudflare-DDNS-Sync');

    expect(repo.name).to.equal('Cloudflare-DDNS-Sync');
  });
});
