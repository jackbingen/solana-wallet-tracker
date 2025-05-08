# solana-wallet-tracker
Cloudflare worker connected with Helius RPC and Helius API in order to send messages in a telegram channel whenever a wallet buys/sells a crypto token. Feel free to use as a baseline for your own wallet tracker.

In order to use this you'll need to create your own webhook with Helius RPC and export the API key into the respected variable in Cloudflare. You'll also need to find your telegram chat id of the channel in which you want your bot sending messages in.
Lastly, you can also edit the bots features utilizing botfather on telegram.
