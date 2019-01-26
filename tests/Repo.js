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

describe ('Repo Tests', () => {
  it ('Should be able to get a specific repo', async () => {
    const user = github.getUser("octocat");
    const repo = user.getRepo("Hello-World");

    const repoData = await repo.asJson();
    const repoName = repoData['name'];

    expect(repoName).to.equal('Hello-World');
  });

  it ('Should be able to get all repos', async () => {
    const user = github.getUser("octocat");

    const repos = await user.getAllPublicRepos();
    const repoNames = [];

    for(const repo of repos) {
      const repoData = await repo.asJson();
      const repoName = repoData['name'];

      repoNames.push(repoName);
    }

    expect(repoNames).to.contain('git-consortium');
    expect(repoNames).to.contain('Spoon-Knife');
    expect(repoNames).to.contain('Hello-World');
  });
});
