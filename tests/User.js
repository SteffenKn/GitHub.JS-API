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
  it ('Should be able to create an user', async () => {
    const user = github.getUser("SteffenKn");

    const userData = await user.asJson();
    const userName = userData['name'];

    expect(userName).to.equal('Steffen Knaup');
  });
});
