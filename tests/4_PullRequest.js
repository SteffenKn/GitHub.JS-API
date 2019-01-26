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

describe ('Pull Request Tests', () => {
  it ('Should Be Able to Get a Specific Pull Request', async () => {
    const pr = github.getUser("octocat").getRepo("Hello-World").getPullRequest(1);

    const prData = await pr.asJson();
    const prTitle = prData['title'];

    expect(prTitle).to.equal('Edited README via GitHub');
  });

  it ('Should Be Able to Get all Pull Request', async () => {
    const prs = await github.getUser("octocat").getRepo("Hello-World").getAllPullRequests();

    expect(prs.length).to.be.greaterThan(160);
  });
});
