'use strict';
const GitHub = require('../dist/GitHub.js');
const config = require('./config.json');

const argv = require('optimist').argv;
const chai = require('chai'); 
const expect = chai.expect;

const github = new GitHub.GitHubApi();

describe ('Orga Tests', () => {
  setAuthToken();

  it ('Should Be Able to Create an Orga', async () => {
    const orga = github.getOrga("GitHub");

    expect(orga.name).to.equal('GitHub');
  });

  it ('Should Be Able to Get Data from an Orga', async () => {
    const orga = github.getOrga("GitHub");

    const orgaData = await orga.asJson();
    const orgaName = orgaData['name'];

    expect(orgaName).to.equal('GitHub');
  });

  it ('Should Not Be Able to Get Data from an Invalid Orga', (done) => {
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

  it ('Should Be Able to Create a Repo', () => {
    const orga = github.getOrga("GitHub");
    const repo = orga.getRepo('VisualStudio');

    expect(repo.name).to.equal('VisualStudio');
  });
});

function setAuthToken() {
  const authTokenInParameter = argv.authToken;
  const authTokenInConfig = config.AUTH_TOKEN;

  const authTokenIsSetInParameter = authTokenInParameter !== undefined;
  const authTokenIsSetInConfig = authTokenInConfig !== '';

  if (authTokenIsSetInParameter) {
    github.authToken = authTokenInParameter;
  } else if (authTokenIsSetInConfig) {
    github.authToken = authTokenInConfig;
  }
}
