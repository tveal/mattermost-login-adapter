import express from 'express';
import { 
    apiUser,
    apiToken,
    apiAuthorize,
    welcome
} from './functions';

const port = process.env.PORT || 3000;
const app = express();
app.listen(port);

const endpoint = (path, func) => {
    app.all(path, (req, res, next) => {
        console.log('ENDPOINT REQUESTED: ' + path);
        func(req, res, next);
    });
};

endpoint("/", welcome);
endpoint("/oauth/authorize", apiAuthorize);
endpoint("/oauth/token", apiToken);
endpoint('/api/v4/user', apiUser);

// Order of calls from Mattermost:
// 1. ENDPOINT REQUESTED: /oauth/authorize
//      Here is where you can put custom logic to authenticate
//      such as returning a custom login page; once you establish
//      the auth you want, redirect to the redirect_uri that is
//      provided in the original request header
// 2. ENDPOINT REQUESTED: /oauth/token
//      return token props for the session as JSON
// 3. ENDPOINT REQUESTED: /api/v4/user
//      return user details as JSON