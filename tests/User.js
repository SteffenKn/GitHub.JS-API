'use strict';
const chai = require('chai'); 
const expect = chai.expect;

const Github = require('../dist/Github.js');
const github = new Github.GithubApi();

describe ('User Tests', () => {
  let user;
  let repo;

  it ('Should be able to create an user', async () => {
    user = github.getUser("octocat");

    const userData = await user.asJson();
    const userName = userData['name'];

    expect(userName).to.equal('The Octocat');
  });

  it ('Should be able to get a specific repo', async () => {
    repo = user.getRepo("Hello-World");

    const repoData = await repo.asJson();
    const repoName = repoData['name'];

    expect(repoName).to.equal('Hello-World');
  });

  it ('Should be able to get all repos', async () => {
    const repos = await user.getAllPublicRepos();
    const repoNames = [];

    for(const singleRepo of repos) {
      const repoData = await singleRepo.asJson();
      const repoName = repoData['name'];

      repoNames.push(repoName);
    }

    expect(repoNames).to.contain('git-consortium');
    expect(repoNames).to.contain('Spoon-Knife');
    expect(repoNames).to.contain('Hello-World');
  });
});