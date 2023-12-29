# Catalyst Examples - React Third Party Authentication

  

This template provides a minimal setup to get React working in Vite with HMR and Auth0 authentication.

This example demonstrates how to use the Catalyst SDK for authentication in a React application. It uses the [Third Party Authentication](https://docs.catalyst.zoho.com/en/cloud-scale/help/authentication/third-party-authentication/introduction/) service to authenticate users.

Demo URL - <https://webauththirdpartyreact-840233827.development.catalystserverless.com>


> This template works without using Catalyst CLI

### Steps to build a frontend app without using Catalyst CLI
1.  Set up the proxy configuration for Catalyst reserved routes.
2.  Initialize the Web SDK explicitly.
3.  Start your development server within the port range of 3000 to 3010 to use Catalyst authentication in the development setup.
4.  After building files, append a prefix "/app/" to the scripts and links path in the index.html.
5.  Create a `client-package.json` file and add the client config (refer to the source code).
6.  Zip the build and upload the zip file to the web client hosting service.


### Auth0 Configuration
<img width="619" alt="Screenshot 2023-12-29 at 7 18 11 AM" src="https://github.com/muthaiyanmani/catalyst/assets/56546428/40538d7d-cb0b-4fd7-acc7-664611c67263">
