import auth0 from 'auth0-js';
import history from './history';
import { AUTH_CONFIG } from './auth0-variables';
import { API_URL } from '../../config'

export default class Auth {
    auth0 = new auth0.WebAuth({
      domain: AUTH_CONFIG.domain,
      clientID: AUTH_CONFIG.clientId,
      redirectUri: AUTH_CONFIG.callbackUrl,
      audience: `https://${AUTH_CONFIG.domain}/userinfo`,
      responseType: 'token id_token',
      scope: 'openid profile email'
    });

    constructor() {
        this.sendEmail = this.sendEmail.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
      }


      sendEmail(email) {
        this.auth0.passwordlessStart({
            connection: 'email',
            send: 'link',
            email: email
        }, function (err, res) {
            if (err) {
                return err
            }
        })
      }
    
      handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.setSession(authResult);
           this.saveUserInfo(authResult);
            history.replace('/');
          } else if (err) {
            console.log(err);
            alert(`Error: ${err.error}. Check the console for further details.`);
          }
        });
      }


      // Save user information to DB
      saveUserInfo(authResult) {
        this.auth0.client.userInfo(authResult.accessToken, (err, res) => {
          localStorage.setItem('sub', res.sub);
          fetch(`${API_URL}/users/registration`, {
            method: "POST",
            body: JSON.stringify(res),
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "same-origin"
          }).then(function(response) {
            response.status     //=> number 100–599
            response.statusText //=> String
            response.headers    //=> Headers
            response.url        //=> String
          
          }, function(error) {
            error.message //=> String
          })
        })
      }
    
      setSession(authResult) {
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        // navigate to the home route
        history.replace('/');
      }
    
      logout() {
        // Clear access token and ID token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('sub');
        // navigate to the home route
        history.replace('/');
      }
    
      isAuthenticated() {
        // Check whether the current time is past the 
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
      }

}

