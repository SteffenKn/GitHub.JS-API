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
    const pullRequestData: JSON = await this.gitHub
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

- getOrga(orgaName: string, configService?: ConfigService): IOrga
  - Parameters
    - orgaName
      - The name of the organization
      - Type: string
    - configService [optional]
      - A custom configService
      - Type: ConfigService

  - Returns
    - The created organization
      - Type: IOrga

- getUser(userName: string, configService?: ConfigService): IUser
  - Parameters
    - userName
      - The name of the user
      - Type: string
    - configService [optional]
      - A custom configService
      - Type: ConfigService

  - Returns
    - The created user
      - Type: IUser

- getLoggedInUser(): Promise<IUser>
  - Parameters

  - Returns
    - A Promise containing logged in user
      - Type: IUser

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
    - A promise containing the data of the owner
      - Type: JSON

- getRepo(repoName: string, configService?: ConfigService): IRepo
  - Parameters
    - repoName
      - The name of the repository
      - Type: string
    - configService [optional]
      - A custom configService
      - Type: ConfigService

  - Returns
    - The created repository
      - Type: IRepo

- getAllPublicRepos(configService?: configService): Promise<Array<IRepo>>
  - Parameters
    - configService [optional]
      - A custom configService
      - Type: ConfigService

  - Returns
    - A promise containing all created public repositories
      - Type: Promise<Array<IRepo>>

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

#### Functions

- asOrgaData(): Promise<IOrganizationData>
  - Parameters
    - None

  - Returns
    - A promise containing the data of the organization
      - Type: IOrganizationData

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

#### Functions

- asUserData(): Promise<IUserData>
  - Parameters
    - None

  - Returns
    - A promise containing the data of the user
      - Type: IUserData

### Repo

A GitHub Repository.

#### Constructor

- Repo(owner: IOwner, name: string, configService?: ConfigService)
  - Parameters
    - owner
      - The owner of the repository
      - Type: IOwner
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
  - Type: IOwner
  - Get

#### Functions

- asJson(): Promise<JSON>
  - Parameters
    - None

  - Returns
    - A promise containing the data of the repository
      - Type: JSON

- asRepositoryData(): Promise<IRepositoryData>
  - Parameters
    - None

  - Returns
    - A promise containing the data of the repository
      - Type: IRepositoryData

- [static] fromData(owner: IOwner, data: JSON, configService?: ConfigService): IRepo
  - Parameters
    - owner
      - The owner of the repository
        - Type: IOwner
    - data
      - The data of the repository
        - Type: JSON
    - configService [optional]
      - A custom configService
      - Type: ConfigService

  - Returns
    - The created repository
      - Type: IRepo

- getPullRequest(pullRequestNumber: number, configService?: ConfigService): IPullRequest
  - Parameters
    - pullRequestNumber: The number of the pull request
      - Type: number
    - configService [optional]
      - A custom configService
      - Type: ConfigService

  - Returns
    - The created pull request
      - Type: IPullRequest

- getOpenPullRequests(configService?: ConfigService): Promise<Array<IRepo>>
  - Parameters
    - configService [optional]
      - A custom configService
      - Type: ConfigService

  - Returns
    - A promise containing all created public repositories
      - Type: Promise<Array<IRepo>>

### Pull Request

A GitHub Pull Request.

#### Constructor

- PullRequest(owner: IOwner, repo: IRepo, pullRequestNumber: number, configService?: ConfigService)
  - Parameters
    - owner
      - The owner of the repository that contains the pull request
      - Type: IOwner
    - repo
      - The repository that contains the pull request
      - Type: IRepo
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
  - Type: IRepo
  - Get

- owner
  - The owner of the repository containing the pull request
  - Type: IOwner
  - Get

#### Functions

- asJson(): Promise<JSON>
  - Parameters
    - None

  - Returns
    - A promise containing the data of the pull request
      - Type: JSON

- asPullRequestData(): Promise<IPullRequestData>
  - Parameters
    - None

  - Returns
    - A promise containing the data of the pull request
      - Type: IPullRequestData

- [static] fromData(owner: IOwner, repo: IRepo, data: JSON, configService?: ConfigService): Pull Request
  - Parameters
    - owner
      - The owner of the repository containing the pull request
      - Type: IOwner
    - repo
      - The repository containing the pull request
      - Type: IRepo
    - data
      - The data of the pull request
      - Type: JSON
    - configService [optional]
      - A custom configService
      - Type: ConfigService

  - Returns
    - The created pull request
      - Type: IPullRequest

## Changelog

### v0.3.1

- 🐛 **Add Missing Functions to Interfaces**

### v0.3.0

- ✨ **Add getLoggedInUser**
- 🐛 **Fix Bug That Changed The Authtoken When Using withAuthtoken**
- ✨ **Add Interfaces**
- ✅ **Add Tests for getLoggedInUser**
- ✅ ♻️ **Use Interfaces in Tests**

### v0.2.1

- 🐛 **Fix Using ConfigService for User**
- 🐛 **Fix Using ConfigService for Orga**

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
