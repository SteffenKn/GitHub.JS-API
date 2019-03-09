'use strict';
const GitHub = require('../dist/GitHub.js');
const config = require('./config.json');

const argv = require('optimist').argv;
const chai = require('chai'); 
const expect = chai.expect;

const github = new GitHub.GitHubApi();

describe ('Pull Request Tests', () => {
  setAuthToken();

  it ('Should Be Able to Get a Specific Pull Request', async () => {
    const pr = github.getUser("octocat").getRepo("Hello-World").getPullRequest(1);

    const prData = await pr.asPullRequestData();
    const prTitle = prData['title'];

    expect(prTitle).to.equal('Edited README via GitHub');
  });

  it ('Should Be Able to Get all Pull Request', async () => {
    const prs = await github.getUser("octocat").getRepo("Hello-World").getOpenPullRequests();

    expect(prs.length).to.be.greaterThan(160);
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
