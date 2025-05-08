# solana-wallet-tracker
Overview: Cloudflare worker connected with Helius RPC and Helius API in order to send messages in a telegram channel whenever a wallet buys/sells a crypto token. Feel free to use as a baseline for your own wallet tracker.

How To Use: In order to use this you'll need to first create your own bot on telegram using botfather. Add the bot into the channel that you want it messaging in, and then find it chat id along with the message thread id. Next, go to helius.dev and create an account where you can create a webhook with Helius RPC and make sure to export the API key. Lastly, you have to put each of these into their respective variables within Cloudflare. Once you have done so, the bot should be able to start sending messages.
