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

### JavaScript

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

### TypeScript

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
  - Type: string
  - Get & Set
  - Default: `https://api.github.com/`

- authToken
  - The [GitHub AuthToken](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)
  - Type: string
  - Get & Set
  - Default: Not set.

- configService
  - The service where all configs are stored
  - Type: ConfigService
  - Get & Set

#### Constructor

- GitHubApi(authToken?: string)
  - Parameters
    - authToken [optional]
      - The [GitHub AuthToken](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)
      - Type: string

#### Functions

- getOrga(orgaName: string, configService?: ConfigService): Orga
  - Parameters
    - orgaName
      - The name of the organization
      - Type: string
    - configService [optional]
      - A custom configService
      - Type: ConfigService

  - Returns
    - The created organization
      - Type: Orga

- getUser(userName: string, configService?: ConfigService): User
  - Parameters
    - userName
      - The name of the user
      - Type: string
    - configService [optional]
      - A custom configService
      - Type: ConfigService

  - Returns
    - The created user
      - Type: User

### Owner [abstract]

#### Constructor

- Owner(name: string, configService?: ConfigService)
  - Parameters
    - name
      - The name of the owner
      - Type: string
    - configService [optional]
      - A custom configService
      - Type: ConfigService

#### Variables

- name
  - The name of the owner
  - Type: string
  - Get

#### Functions

- asJson(): Promise<JSON>
  - Parameters
    - None

  - Returns
    - A promise containing the data of the owner as JSON
      - Type: JSON

- getRepo(repoName: string, configService?: ConfigService): Repo
  - Parameters
    - repoName
      - The name of the repository
      - Type: string
    - configService [optional]
      - A custom configService
      - Type: ConfigService

  - Returns
    - The created repository
      - Type: Repo

- getAllPublicRepos(configService?: configService): Promise<Array<Repo>>
  - Parameters
    - configService [optional]
      - A custom configService
      - Type: ConfigService

  - Returns
    - A promise containing all created public repositories
      - Type: Promise<Array<Repo>>

### Orga [extends Owner]

A GitHub Organization.

#### Constructor

- Orga(name: string, configService?: ConfigService)
  - Parameters
    - name
      - The name of the orga
      - Type: string
    - configService [optional]
      - A custom configService
      - Type: ConfigService

### User [extends Owner]

A GitHub User.

#### Constructor

- User(name: string, configService?: ConfigService)
  - Parameters
    - name
      - The name of the user
      - Type: string
    - configService [optional]
      - A custom configService
      - Type: ConfigService

### Repo

A GitHub Repository.

#### Constructor

- Repo(owner: Owner, name: string, configService?: ConfigService)
  - Parameters
    - owner
      - The owner of the repository
      - Type: owner
    - name
      - The name of the repository
      - Type: string
    - configService [optional]
      - A custom configService
      - Type: ConfigService

#### Variables

- name
  - The name of the repository
  - Type: string
  - Get

- owner
  - The owner of the repository
  - Type: Owner
  - Get

#### Functions

- asJson(): Promise<JSON>
  - Parameters
    - None

  - Returns
    - A promise containing the data of the repository as JSON
      - Type: JSON

- [static] fromData(owner: Owner, data: JSON, configService?: ConfigService): Repo
  - Parameters
    - owner
      - The owner of the repository
        - Type: Owner
    - data
      - The data of the repository
        - Type: JSON
    - configService [optional]
      - A custom configService
      - Type: ConfigService

  - Returns
    - The created repository
      - Type: Repo

- getPullRequest(pullRequestNumber: number, configService?: ConfigService): PullRequest
  - Parameters
    - pullRequestNumber: The number of the pull request
      - Type: number
    - configService [optional]
      - A custom configService
      - Type: ConfigService

  - Returns
    - The created pull request
      - Type: PullRequest

- getOpenPullRequests(configService?: ConfigService): Promise<Array<Repo>>
  - Parameters
    - configService [optional]
      - A custom configService
      - Type: ConfigService

  - Returns
    - A promise containing all created public repositories
      - Type: Promise<Array<Repo>>

### Pull Request

A GitHub Pull Request.

#### Constructor

- PullRequest(owner: Owner, repo: Repo, pullRequestNumber: number, configService?: ConfigService)
  - Parameters
    - owner
      - The owner of the repository that contains the pull request
      - Type: Owner
    - repo
      - The repository that contains the pull request
      - Type: Repo
    - pullRequestNumber
      - The number of the pull request
      - Type: number
    - configService [optional]
      - A custom configService
      - Type: ConfigService

#### Variables

- number
  - The number of the pull request
  - Type: number
  - Get

- repo
  - The repository containing the pull request
  - Type: Repo
  - Get

- owner
  - The owner of the repository containing the pull request
  - Type: Owner
  - Get

#### Functions

- asJson(): Promise<JSON>
  - Parameters
    - None

  - Returns
    - A promise containing the data of the repository as JSON
      - Type: JSON

- [static] fromData(owner: Owner, repo: Repo, data: JSON, configService?: ConfigService): Pull Request
  - Parameters
    - owner
      - The owner of the repository containing the pull request
      - Type: Owner
    - repo
      - The repository containing the pull request
      - Type: Repo
    - data
      - The data of the pull request
      - Type: JSON
    - configService [optional]
      - A custom configService
      - Type: ConfigService

  - Returns
    - The created pull request
      - Type: PullRequest

## Changelog

### v0.2.0

- ✨ **Add Declarations**
- ✨ **Add Registry**
- ♻️ **Refactor ConfigService & HttpClient**

### v0.1.0

- ✨ **Add Basic Support for Users**
- ✨ **Add Basic Support for Orgas**
- ✨ **Add Basic Support for Repos**
- ✨ **Add Basic Support for Pull Requests**
- ✨ **Add ConfigService**
- ✨ **Add HttpClient**
- ✅ **Add Tests**
- 🏷 **Add Types**
