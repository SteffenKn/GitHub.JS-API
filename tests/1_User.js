'use strict';
const GitHub = require('../dist/GitHub.js');
const config = require('./config.json');

const argv = require('optimist').argv;
const chai = require('chai'); 
const expect = chai.expect;

const github = new GitHub.GitHubApi();

describe ('User Tests', () => {
  setAuthToken();

  it ('Should Be Able to Create an User', async () => {
    const user = github.getUser("SteffenKn");

    const userData = await user.asUserData();
    const userName = userData.name;

    expect(userName).to.equal('Steffen Knaup');
  });

  it ('Should Be Able to Get Data from an User', async () => {
    const user = github.getUser("SteffenKn");

    const userData = await user.asUserData();
    const userName = userData.name;

    expect(userName).to.equal('Steffen Knaup');
  });

  it ('Should Not Be Able to Get Data from an Invalid User', (done) => {
    github.getUser("Not-Existing-User").asUserData()
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

  it ('Should Be Able to Get the Logged In User', async () => {
    const user = await github.getLoggedInUser();

    const userData = await user.asUserData();
    const userName = userData.login;

    expect(userName).to.equal(config.LOGGED_IN_USER);
  });

  it ('Should Not Be Able to Get the Logged In User With Invalid AuthToken', (done) => {
    github.withAuthToken().getLoggedInUser()
      .then(() => {
        done('Did not throw an error');
      })
      .catch((error) => {
        const expectedErrorMessage = 'Error: Authtoken must be provided to use "getLoggedInUser"';

        const isCorrectError = error.message === expectedErrorMessage;
        if(isCorrectError){
          done();
        } else {
          done(`Wrong error was thrown. Expected: "${expectedErrorMessage}", but got "${error.message}"`);
        }
      });
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
