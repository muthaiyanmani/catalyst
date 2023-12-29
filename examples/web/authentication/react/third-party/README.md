# Catalyst Examples - React Third Party Authentication

  

This template provides a minimal setup to get React working in Vite with HMR and Auth0 authentication.

This example demonstrates how to use the Catalyst SDK for authentication in a React application. It uses the [Third Party Authentication](https://docs.catalyst.zoho.com/en/cloud-scale/help/authentication/third-party-authentication/introduction/) service to authenticate users.

Demo URL - <https://webauththirdpartyreact-840233827.development.catalystserverless.com>

> This template works without using Catalyst CLI

Things to be done to without using Catalyst CLI
 -   Set up the proxy configuration for catalyst reserved routes
 -   Initialise the web sdk explicitly.
 -   Always start your development server in this port range **3000 - 3010** to use catalyst authentication in dev setup.
-   After build files, append a prefix "/app/" in the scripts and links path in the index.html
- Create a *client-package.json* file and add the client config [ refer the source code ]
- Zip the build and upload the zip file in the web client hosting service
  
Sure, here are the corrected steps:

### Steps to build a frontend app without using Catalyst CLI
1.  Set up the proxy configuration for Catalyst reserved routes.
2.  Initialize the Web SDK explicitly.
3.  Start your development server within the port range of 3000 to 3010 to use Catalyst authentication in the development setup.
4.  After building files, append a prefix "/app/" to the scripts and links path in the index.html.
5.  Create a `client-package.json` file and add the client config (refer to the source code).
6.  Zip the build and upload the zip file to the web client hosting service.


### Auth0 Configuration
![Configuration details](/auth0-config.png)