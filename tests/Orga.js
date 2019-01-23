'use strict';
const chai = require('chai'); 
const expect = chai.expect;

const Github = require('../dist/Github.js');
const github = new Github.GithubApi();

describe ('Orga Tests', () => {
  let orga;
  let repo;

  it ('Should be able to create an orga', async () => {
    orga = github.getOrga("GitHub");

    const orgaData = await orga.asJson();
    const orgaName = orgaData['name'];

    expect(orgaName).to.equal('GitHub');
  });

  it ('Should be able to get a specific repo', async () => {
    repo = orga.getRepo("gitignore");

    const repoData = await repo.asJson();
    const repoName = repoData['name'];

    expect(repoName).to.equal('gitignore');
  });

  it ('Should be able to get all repos', async () => {
    const repos = await orga.getAllRepos();
    const repoNames = [];

    for(const singleRepo of repos) {
      const repoData = await singleRepo.asJson();
      const repoName = repoData['name'];

      repoNames.push(repoName);
    }

    expect(repoNames).to.contain('dmca');
    expect(repoNames).to.contain('gitignore');
    expect(repoNames).to.contain('VisualStudio');
  });
});