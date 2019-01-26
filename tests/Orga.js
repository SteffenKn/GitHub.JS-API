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

describe ('Orga Tests', () => {
  it ('Should be able to create an orga', async () => {
    const orga = github.getOrga("GitHub");

    expect(orga.name).to.equal('GitHub');
  });

  it ('Should be able to get data from an orga', async () => {
    const orga = github.getOrga("GitHub");

    const orgaData = await orga.asJson();
    const orgaName = orgaData['name'];

    expect(orgaName).to.equal('GitHub');
  });

  it ('Should not be able to get data from an invalid orga', (done) => {
    github.getOrga("Not-Existing-Orga").asJson()
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
    const orga = github.getOrga("GitHub");
    const repo = orga.getRepo('VisualStudio');

    expect(repo.name).to.equal('VisualStudio');
  });
});
