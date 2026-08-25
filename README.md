# Cognigy Zoho OAuth POST Extension

This extension adds a POST to Zoho Flow Node and a secure connection containing url, client_id, client_secret, refresh_token, and grant_type.

## Build in GitHub
1. Add all five files at the repository root using the displayed paths.
2. Commit them to main, open Actions, and run Build Cognigy extension.
3. Download the cognigy-zoho-oauth-post artifact and unzip it once.
4. Keep zoho-oauth-post.tar.gz compressed for Cognigy.

## Install and configure
1. In Cognigy, open Manage > Extensions and upload zoho-oauth-post.tar.gz.
2. Open Manage > Connections and create a Zoho OAuth POST connection.
3. Enter the URL and all four Zoho values. Normally grant_type is refresh_token.
4. Add POST to Zoho to a Flow and select the connection.
5. The result is written to Cognigy Context under zohoResponse by default.

Never commit real Zoho credentials to GitHub.
