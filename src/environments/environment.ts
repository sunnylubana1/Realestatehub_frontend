
export const environment = { production: false,apiUrl: 'https://localhost:5001/api',
     siteName: 'Brickzo.in',
       oauth: {
            googleClientId: '534217656341-dmg353ljbgup9c78fr37jjvcpt3v1dv7.apps.googleusercontent.com',     // put real key here
            facebookAppId: '1351673869963382'        // put real key here
        },
        auth: {
            tokenStorageKey: '6xFiO10Pm4lC6JXTJIBLR50Qql2MCHUR5Ijv2IIPzg+i/l9SFHZJ+ECYAto57g5p',             // single key to change storage
            loginPath: '/auth/login', 
            afterLoginRedirect: '/',                // home route
            afterLogoutRedirect: '/'
        }
 };
