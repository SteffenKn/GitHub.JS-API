# GitHub.JS-API

[![NPM](https://nodei.co/npm/github-js-api.png)](https://www.npmjs.com/package/github-js-api)

## Overview

Github.JS-API is a simple JavaScript GitHub API wrapper.

## Getting Started

### Prerequisites

- Node

### Installation

To install Github.JS-API simply run:

```
npm install github-js-api
```

in your project folder.

## Running the Tests

To run the test a few changes need to be done.

1. Open the `config.json` in the `tests` folder
2. Set the owner name and the repo name of one of your private repositories
3. The [GitHub AuthToken](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) can also be set in `config.json` or later as a parameter in the test command.

The tests can then be run via:

```
  npm test
```

or

```
  npm test -- --authToken=<Your GitHub Auth Token>
```

in case the auth token was not already set in the `config.json`;



## Usage

```javascript
const GitHubApi = require('github-js-api').GitHubApi;

const gitHub = new GitHubApi();

async function printPullRequestData() {
  const pullRequestData = await gitHub
                                  .getUser('octocat')
                                  .getRepo('Hello-World')
                                  .getPullRequest(493)
                                  .asJson();

  console.log(pullRequestData);
}

printPullRequestData();
```

```typescript
import {GitHubApi} from 'github-js-api';

class GitHubApiSample {
  public gitHub: GitHubApi = new GitHubApi();

  public async printPullRequestData() {
    const pullRequestData = await this.gitHub
                                        .getUser('octocat')
                                        .getRepo('Hello-World')
                                        .getPullRequest(493)
                                        .asJson();

   console.log(pullRequestData);
  }
}

const gitHubApi: GitHubApi = new GitHubApiSample();

gitHubApi.printPullRequestData();
```

## Documentation

### GitHub

#### Variables

- endpoint
  - The GitHub api endpoint
  - Get & Set
  - Default: `https://api.github.com/`

- authToken
  - The [GitHub AuthToken](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)
  - Get & Set
  - Default: Not set.

#### Constructor

- GitHubApi(authToken?: string)
  - Parameters
    - authToken (optional): The [GitHub AuthToken](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)

#### Functions

- getOrga(orgaName: string): Orga
  - Parameters
    - orgaName: The name of the organization

  - Returns
    - The created organization

- getUser(userName: string): User
  - Parameters
    - userName: The name of the user

  - Returns
    - The created user

### Orga

A GitHub Organization.

#### Variables

- name
  - The name of the organization
  - Get

#### Functions
