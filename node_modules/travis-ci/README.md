node-travis-ci [![Build Status](https://travis-ci.org/pwmckenna/node-travis-ci.png?branch=master)](https://travis-ci.org/pwmckenna/node-travis-ci)
==============

node library to access the [Travis-CI API](https://api.travis-ci.org/docs/)

[![NPM](https://nodei.co/npm/travis-ci.png?downloads=true&stars=true)](https://npmjs.org/package/travis-ci)

# Instantiation

```js
var Travis = require('travis-ci');
var travis = new Travis({
    version: '2.0.0'
});

// To access the Travis-CI Pro API
var travis = new Travis({
    version: '2.0.0',
    pro: true
});

// To access the Travis-CI Enterprise API
var travis = new Travis({
    version: '2.0.0',
    enterprise: 'https://travis.example.com'
});

// To set custom headers
var travis = new Travis({
  version: '2.0.0',
  headers: {
    'user-agent': 'My Custom User Agent'
  }
});
```

# API

### Upgrade Notice (Migrating to 2.x)
Due to the expanding travis api, there were an increasing number of cases where a function could conceivably map to several http endpoints. To eliminate that complexity, and to ensure that the entire api could be exposed, the api has been rewritten to be a much more transparent layer on top of the http interface. Url path segments that are exposed as objects, unless they are followed by url parameters, in which case they are exposed as functions that consume those arguments. The function that makes the api call is now just http verbs (`get`/`post`/etc).

For instance, to use this library to call `GET /repos/:owner_name/:name/builds/:id`, you now do something like the following:
```js
travis.repos(ownerName, repoName).builds(buildId).get(function (err, res) {
   // same res as before
});
```

### Authentication

Many functions, such as [`travis.accounts`](https://api.travis-ci.org/docs/#Accounts), require authenticating as a user. 
Currently the only way to authenticate is to start with a github oauth token, request a travis access token, and authenticate with that.

```js
travis.auth.github.post({
    github_token: GITHUB_OAUTH_TOKEN
}, function (err, res) {
    // res => {
    //     access_token: XXXXXXX
    // }
    travis.authenticate({
        access_token: res.access_token
    }, function (err) {
         // we've authenticated!
    });
});
```

As a convenience, `authenticate` also accepts github tokens, or github credentials (which are only sent to github) and performs the necessary requests to acquire a travis access token. For example:

```js
travis.authenticate({
    github_token: GITHUB_OAUTH_TOKEN
}, function (err) {
    // we've authenticated! 
});
```
or
```js
travis.authenticate({
    username: GITHUB_USERNAME,
    password: GITHUB_PASSWORD
}, function (err) {
    //we've authenticated!
});
```

> __Pro Tip:__ Authentication is simply a convenience function that ensures your token has the required permissions, then appends your `access_token` to all subsequent requests. You can alternatively pass `access_token` to any request where permission is required.

### [Accounts](https://api.travis-ci.org/docs/#Accounts)

Accounts calls require [authentication](#Authentication).

```js
travis.accounts.get(function (err, res) {
    // res => {
    //     "accounts": [
    //         {
    //             "id": 5186,
    //             "name": "Patrick Williams",
    //             "login": "pwmckenna",
    //             "type": "user",
    //             "repos_count": 48
    //         },
    //         {
    //             "id": ***,
    //             "name": "BitTorrent Torque Labs",
    //             "login": "bittorrenttorque",
    //             "type": "organization",
    //             "repos_count": ***
    //         },
    //         {
    //             "id": ***,
    //             "name": null,
    //             "login": "Studyokee",
    //             "type": "organization",
    //             "repos_count": ***
    //         },
    //         {
    //             "id": ***,
    //             "name": "BitTorrent Inc.",
    //             "login": "bittorrent",
    //             "type": "organization",
    //             "repos_count": ***
    //         }
    //     ]
    // }
});
```

### [Authorization](https://api.travis-ci.org/docs/#Authorization)

```js
travis.auth.github.post({
    github_token: GITHUB_OAUTH_TOKEN
}, function (err, res) {
    // res => {
    //     access_token: ***
    // }
});
```

Additional endpoints that have not be implemented yet:

* [travis.auth.authorize](https://api.travis-ci.org/docs/#/auth/authorize)
* [travis.auth.access_token](https://api.travis-ci.org/docs/#POST%20/auth/access_token)

Endpoints that exist, but are intended for brower flows:

* [travis.auth.handshake](https://api.travis-ci.org/docs/#/auth/handshake)
* [travis.auth.post_message](https://api.travis-ci.org/docs/#/auth/post_message)
* [travis.auth.post_message.iframe](https://api.travis-ci.org/docs/#/auth/post_message/iframe)

### [Branches](https://api.travis-ci.org/docs/#Branches)

```js
travis.branches.get(function (err, res) {
    // res => {
    //     branches: [],
    //     commits: []
    // }
});
```

### [Broadcasts](https://api.travis-ci.org/docs/#Broadcasts)

```js
travis.broadcasts.get(function (err, res) {
    // res => {
    //     broadcasts: []
    // }
});
```

### [Builds](https://api.travis-ci.org/docs/#Builds)

```js
// to get the info for a specific build, specify the build id
// this is data used for pages such as:
// https://travis-ci.org/pwmckenna/node-travis-ci/builds/10380000
travis.builds(10380000).get(function (err, res) {
    // res => {
    //     "build": {
    //         "id": 10380000,
    //         "repository_id": 1095505,
    //         "commit_id": 3053424,
    //         "number": "43",
    //         "pull_request": false,
    //         "pull_request_title": null,
    //         "pull_request_number": null,
    //         "config": {
    //             "language": "node_js",
    //             "node_js": [
    //                 "0.10.1"
    //             ],
    //             "script": [
    //                 "./node_modules/grunt-cli/bin/grunt test"
    //             ],
    //             ".result": "configured",
    //             "global_env": [
    //                 {
    //                     "secure": "SHezJGUSi1cc/V+AWBgmGe...
    //                 },
    //                 {
    //                     "secure": "opq2IxY6TquOtn4nCI75Y...
    //                 },
    //                 {
    //                     "secure": "f4rapdrgZJIeqUUBu3Bp/...
    //                 }
    //             ]
    //         },
    //         "state": "canceled",
    //         "started_at": null,
    //         "finished_at": "2013-10-30T23:19:20Z",
    //         "duration": 0,
    //         "job_ids": [
    //             10380001
    //         ]
    //     },
    //     "commit": {
    //         "id": 3053424,
    //         "sha": "af594e5b0744e6fdd4af5c7470652286420db430",
    //         "branch": "master",
    //         "message": "1.0.1",
    //         "committed_at": "2013-08-19T20:12:25Z",
    //         "author_name": "Patrick Williams",
    //         "author_email": "pwmckenna@gmail.com",
    //         "committer_name": "Patrick Williams",
    //         "committer_email": "pwmckenna@gmail.com",
    //         "compare_url": "https://github.com/pwmckenna/node-travis-ci/...
    //     },
    //     "jobs": [
    //         {
    //             "id": 10380001,
    //             "repository_id": 1095505,
    //             "build_id": 10380000,
    //             "commit_id": 3053424,
    //             "log_id": 4540661,
    //             "state": "canceled",
    //             "number": "43.1",
    //             "config": {
    //                 "language": "node_js",
    //                 "node_js": "0.10.1",
    //                 "script": [
    //                     "./node_modules/grunt-cli/bin/grunt test"
    //                 ],
    //                 ".result": "configured",
    //                 "global_env": "GITHUB_OAUTH_TOKEN=[secure] ...
    //             },
    //             "started_at": null,
    //             "finished_at": "2013-10-30T23:19:19Z",
    //             "queue": "builds.linux",
    //             "allow_failure": false,
    //             "tags": ""
    //         }
    //     ]
    // }
});
```
```js
// to cancel a build
travis.builds(10380000).cancel.post(function (err) {
});
```

### [Documentation](https://api.travis-ci.org/docs/#Documentation)

```js
travis.documentation.get(function (err, res) {
    // res => <html>
    //     ...
    // </html
});
```

### [Endpoints](https://api.travis-ci.org/docs/#Endpoints)

```js
travis.endpoints.get(function (err, res) {
    // res => [
    //     {
    //         "name": "Home",
    //         "doc": "",
    //         "prefix": "/",
    //         "routes": [
    //             {
    //                 "uri": "/",
    //                 "verb": "GET",
    //                 "doc": "Landing point...",
    //                 "scope": "public"
    //             },
    //             {
    //                 "uri": "/redirect",
    //                 "verb": "GET",
    //                 "doc": "Simple endpoints that redirects somewhere else...",
    //                 "scope": "public"
    //             },
    //             {
    //                 "uri": "/config",
    //                 "verb": "GET",
    //                 "doc": "Provides you with system info:...",
    //                 "scope": "public"
    //             }
    //         ]
    //     },
    //     {
    //         "name": "Accounts",
    //         "doc": "",
    //         "prefix": "/accounts",
    //         "routes": [
    //             {
    //                 "uri": "/accounts/",
    //                 "verb": "GET",
    //                 "doc": "",
    //                 "scope": "private"
    //             }
    //         ]
    //     },
    //     ...
    // ]
});
```
```js
travis.endpoints('endpoints').get(function (err, res) {
    // res => {
    //     "name": "Endpoints",
    //     "doc": "Documents all available API endpoints...",
    //     "prefix": "/endpoints",
    //     "routes": [
    //         {
    //             "uri": "/endpoints/",
    //             "verb": "GET",
    //             "doc": "Lists all available API endpoints by URI prefix...",
    //             "scope": "public"
    //         },
    //         {
    //             "uri": "/endpoints/:prefix",
    //             "verb": "GET",
    //             "doc": "Infos about a specific controller....",
    //             "scope": "public"
    //         }
    //     ]
    // }
});
```

### [Hooks](https://api.travis-ci.org/docs/#Hooks)

All hook calls require [authentication](#Authentication).

```js
travis.hooks.get(function (err, res) {
    // res => [
    //     {
    //         id: 1095505,
    //         name: 'node-travis-ci',
    //         owner_name: 'pwmckenna',
    //         description: 'node library to access the Travis-CI API',
    //         active: true,
    //         private: false,
    //         admin: true
    //     }
    //     ...
    // ]
});
```
```js
travis.hooks(1095505).put(
    hook: {
        active: false
    }
}, function (err, res) {
});
```

### [Jobs](https://api.travis-ci.org/docs/#Jobs)

```js
travis.jobs(JOB_ID).get(function (err, res) {
    // res => {
    //     "job": {
    //         "id": 9624444,
    //         "repository_id": 1095505,
    //         "repository_slug": "pwmckenna/node-travis-ci",
    //         "build_id": 9624443,
    //         "commit_id": 2836527,
    //         "log_id": 3986694,
    //         "state": "failed",
    //         ...
    //     },
    //     "commit": {
    //         "id": 2836527,
    //         "sha": "431d6e5d899f165e4786ce82c4672975cddca670",
    //         "branch": "master",
    //         "message": "fixing builds test",
    //         ...
    //     }
    // }
});
```
```js
travis.jobs.log({
    job_id: JOB_ID
}, function (err, res) {
    
});
```

### [Logs](https://api.travis-ci.org/docs/#Logs)

```js
travis.logs({
    id: LOG_ID
}, function (err, res) {
    // res => {
    //     log: {
    //         id: 3986694,
    //         job_id: 9624444,
    //         type: 'Log',
    //         body: 'Using worker: worker-linux-6-2.bb.travis-ci.org:travis-linux-15\n\n$ export GITHUB_OAUTH_TOKEN=[secure]...
    //     }
    // }
});
```

### [Repos](https://api.travis-ci.org/docs/#Repos)

```js
travis.repos('pwmckenna').get(function (err, res) {
    // res => {
    //     "repos": [
    //         {
    //         "id": 1095505,
    //         "slug": "pwmckenna/node-travis-ci",
    //         "description": "node library to access the Travis-CI API",
    //         "last_build_id": 6347735,
    //         "last_build_number": "468",
    //         "last_build_state": "started",
    //         "last_build_duration": null,
    //         "last_build_language": null,
    //         "last_build_started_at": "2013-04-15T09:45:29Z",
    //         "last_build_finished_at": null
    //         }
    //     ]
    // }
});
```
```js
travis.repos('pwmckenna', 'node-travis-ci').get(function (err, res) {
    // res => {
    //     "repo": {
    //         "id": 1095505,
    //         "slug": "pwmckenna/node-travis-ci",
    //         "description": "node library to access the Travis-CI API",
    //         ...
    //     }
    // }
});
```
```js
travis.repos(repoId).key.get(function (err, res) {
    // res => {
    //   key: '-----BEGIN RSA PUBLIC KEY-----\nMIGfMA0GCSqGSIb...'    
    // }
});
```
```js
travis.repos('pwmckenna', 'node-travis-ci').builds.get(function (err, res) {
    // res => {
    //     builds: [],
    //     commits: []
    // }
});
```

### [Requests](https://api.travis-ci.org/docs/#Requests)

Requests calls require [authentication](#Authentication).

```js
travis.requests.post(({
    build_id: BUILD_ID    
}, function (err, res) {
    // res => {
    //     "result": true,
    //     "flash": [
    //         {
    //             "notice": "The build was successfully restarted."
    //         }
    //     ]
    // }
});
```

### [Users](https://api.travis-ci.org/docs/#ss)

All user calls require [authentication](#Authentication).

```js
travis.users.get(function (err, res) {
    // res => {
    //     "user": {
    //         "id": 5186,
    //         "name": "Patrick Williams",
    //         "login": "pwmckenna",
    //         "email": "patrick@bittorrent.com",
    //         "gravatar_id": "894f552b86b959df97353a7296baee5c",
    //         "locale": "en",
    //         "is_syncing": false,
    //         "synced_at": "2013-10-30T22:47:49Z",
    //         "correct_scopes": true,
    //         "created_at": "2012-02-07T22:17:38Z"
    //     }
    // }
});
```
```js
travis.users.permissions.get(function (err, res) {
    // res => {
    //     "permissions": [
    //         1446577,
    //         107140,
    //         1402719,
    //         1392622,
    //         ...
    //     ]
    // }

});
```
```js
travis.users.sync.post(function (err, res) {
    // res => {
    //     "result": true
    // }
});
```

# CLI

To install as a command line utility, just install globally via npm.

```bash
npm install -g travis-ci
```

The entire library is available via command line interface. While it uses subcommands, the api is the same as above.

```bash
travis-ci authenticate --username=pwmckenna --password=superSecret
=>  {
        "access_token": "F7DlolJkD15isf4KEDuh_A"
    }
# or
travis-ci auth github --github_token=ef7c329fb63479eb5be9719bb8b23162072bb20d
=>  {
        "access_token": "F7DlolJkD15isf4KEDuh_A"
    }
```

> __Pro Tip:__ Passing OAuth tokens or github credentials via the command line will leave them in your shell history for all to see. Please shell responsibly.


Use the `access_token` above in all subsequent commands that require authentication, such as requesting the builds for this project:

```bash
travis-ci repos pwmckenna node-travis-ci builds --access_token=F7DlolJkD15isf4KEDuh_A
=>  {
        "builds": [
            {
                "id": 9630304,
                "repository_id": 1095505,
                "pull_request": false,
                "state": "passed",
                ...
            },
            ...
        ]
    }
```
