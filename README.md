# Mattermost Login Adapter

> Mattermost is an open source, self-hosted Slack-alternative
~ https://www.mattermost.org

**Goal:** Enable custom auth (such as LDAP) in Mattermost Team (open source version) without
modifying Mattermost.

Mattermost Team Edition (free and open-source version) supports local users and
Single-Sign-On (SSO) via GitLab. LDAP and other advanced login support is in the non-free
enterprise versions of Mattermost. This project mocks the API endpoints of GitLab that Mattermost
calls, so you can build out your own custom login implementation.

## Prereq's

You need node, npm, and Docker. Tested with:
```
npm -v    -> 6.4.1
node -v   -> v8.16.0
docker -v -> Docker version 19.03.1, build 74b1e89
```

## Getting Started

1. Run Mattermost as a Docker container ([ref](https://docs.mattermost.com/install/docker-local-machine.html))

    ```bash
    docker run --name mattermost-preview -d --network host mattermost/mattermost-preview
    ```
    Mattermost is hosted at http://localhost:8065/ (might take a little bit to start)

2. Once Mattermost is started the first time, setup the first user. This will be the admin user.

3. Go to the `System Console > AUTHENTICATION > GitLab`, then:
    - set **Enable authentication with GitLab** to **true**
    - set **GitLab Site URL** to `http://localhost:3000`
    - Save and logout

4. Get the node server started with mocked SSO endpoints

    ```bash
    npm ci
    npm run build
    npm run watch
    ```
    node server hosted at http://localhost:3000

5. Back in Mattermost at the login screen, you should see a GitLab button. Click it! If everything
went well, the node server should mock an authentication with a fake user. The first time you
login with this user, you'll need to **Create a new team**.

## Tear Down

Don't forget to:
- Stop your node server (`Ctrl + C` in the active terminal)
- Stop Mattermost (`docker stop mattermost-preview`)

If you don't also *remove* the mattermost-preview docker container, then you can just start it back
next time with `docker start mattermost-preview`. This will retain the settings/users you setup.

Resources
- [Example Node Server with Babel](https://github.com/babel/example-node-server)
- [Crivaledaz's Mattermost-LDAP Module](https://github.com/Crivaledaz/Mattermost-LDAP)
- [GitLab Community Edition src](https://gitlab.com/gitlab-org/gitlab-ce)