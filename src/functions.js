// fake token; TODO: implement OAUTH
const accessToken = "1f0af717251950dbd4d73154fdf0a474a5c5119adad999683f5b450c460726aa";

export function welcome(req, res, next) {
    res.json({
        msg: "Welcome to the Mattermost Login Adapter!",
        api: {
            "/oauth/authorize": "redirect back to Mattermost with code and state query params",
            "/oauth/token": "return a token",
            "/api/v4/user": "return a json payload of user details"
        }
    });
};

export function apiAuthorize(req, res, next) {
    const redirect_uri = req.query.redirect_uri;
    const state = req.query.state;
    // must include 'code' and 'state' query params
    // state is in the original request query params
    res.redirect(redirect_uri + '?code=1234567890&state=' + state);
};

export function apiToken(req, res, next) {
    const token = {
        "access_token": accessToken,
        "token_type": "bearer",
        "expires_in": 7200
    };

    res.status(200);
    res.json(token);
};

export function apiUser(req, res, next) {
    // TODO: verify Bearer token from req
    // https://docs.gitlab.com/ee/api/users.html#list-current-user-for-normal-users
    res.json({
        "id": 1,
        "username": "john_smith",
        "email": "john@example.com",
        "name": "John Smith",
        "state": "active",
        "avatar_url": "http://localhost:3000/uploads/user/avatar/1/index.jpg",
        "web_url": "http://localhost:3000/john_smith",
        "created_at": "2012-05-23T08:00:58Z",
        "bio": null,
        "location": null,
        "public_email": "john@example.com",
        "skype": "",
        "linkedin": "",
        "twitter": "",
        "website_url": "",
        "organization": "",
        "last_sign_in_at": "2012-06-01T11:41:01Z",
        "confirmed_at": "2012-05-23T09:05:22Z",
        "theme_id": 1,
        "last_activity_on": "2012-05-23",
        "color_scheme_id": 2,
        "projects_limit": 100,
        "current_sign_in_at": "2012-06-02T06:36:55Z",
        "identities": [
          {"provider": "github", "extern_uid": "2435223452345"},
          {"provider": "bitbucket", "extern_uid": "john_smith"},
          {"provider": "google_oauth2", "extern_uid": "8776128412476123468721346"}
        ],
        "can_create_group": true,
        "can_create_project": true,
        "two_factor_enabled": true,
        "external": false,
        "private_profile": false
    });
};