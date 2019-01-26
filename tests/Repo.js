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
  it ('Should Be Able to Get a Specific Repo', async () => {
    const user = github.getUser("SteffenKn");
    const repo = user.getRepo("Cloudflare-DDNS-Sync");

    const repoData = await repo.asJson();
    const repoName = repoData['name'];

    expect(repoName).to.equal('cloudflare-ddns-sync');
  });

  it ('Should Be Able to Get All Repos', async () => {
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

  it ('Should Throw an Error When Trying to Get a Repo That Does Not Exist', (done) => {
    github.getUser('SteffenKn').getRepo('Not-Existing-Repo').asJson()
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

  it ('Should Get a Private Repo with the Correct Authtoken', async () => {
    const repoData = await github.getUser('SteffenKn').getRepo('Test-Repo').asJson();
    const repoName = repoData['name'];

    expect(repoName).to.equal('Test-Repo');
  });

  it ('Should Not Get a Private Repo with an Invalid Authtoken', (done) => {
    github.authToken = 'invalid-test-token';

    github.getUser('SteffenKn').getRepo('Test-Repo').asJson()
    .then(() => {
      done('Did not throw an error');
    })
    .catch((error) => {
      const expectedErrorMessage = 'Bad credentials';

      const isCorrectError = error.message === expectedErrorMessage;
      if(isCorrectError){
        done();
      } else {
        done(`Wrong error was thrown. Expected: "${expectedErrorMessage}", but got "${error.message}"`);
      }
    });
  });
});
