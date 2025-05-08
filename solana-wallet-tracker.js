const TELEGRAM_BOT_TOKEN = BOT_TOKEN;
const TELEGRAM_CHAT_ID = CHAT_ID;
const TELEGRAM_MESSAGE_THREAD_ID = MESSAGE_THREAD_ID;
const HELIUS_API_KEY = API_KEY;
const HELIUS_RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

const nicknames = {
  'HMWNJyLUR17mFZo3FbYDarDRj27qYKoUcx273m8oYmAC': 'Comet',
  'GJA1HEbxGnqBhBifH9uQauzXSB53to5rhDrzmKxhSU65': 'Latuche',
  '8MaVa9kdt3NW4Q5HyNAm1X5LbR8PQRVDc1W8NMVK88D5': 'Daumen',
  '8deJ9xeUvXSJwicYptA9mHsU2rN2pDx37KWzkDkEXhU6': 'Cooker',
  '6nhskL8RVpXzWXC7mcC7UXpe3ze2p6P6og1jXVGUW88s': 'PattyIce',
  '3kebnKw7cPdSkLRfiMEALyZJGZ4wdiSRvmoN4rD1yPzV': 'Bastille',
  'DNfuF1L62WWyW3pNakVkyGGFzVVhj4Yr52jSmdTyeBHm': 'Gake',
  'EdDCRfDDeiiDXdntrP59abH4DXHFNU48zpMPYisDMjA7': 'Mezoteric',
  'AVAZvHLR2PcWpDf8BXY4rVxNHYRBytycHkcB5z5QNXYm': 'Ansem',
  'DfMxre4cKmvogbLrPigxmibVTTQDuzjdXojWzjCXXhzj': 'Euris',
  '3rSZJHysEk2ueFVovRLtZ8LGnQBMZGg96H2Q4jErspAF': 'Staqi',
  'CRVidEDtEUTYZisCxBZkpELzhQc9eauMLR3FWg74tReL': 'Frank',
  '7Dt5oUpxHWuKH8bCTXDLz2j3JyxA7jEmtzqCG6pnh96X': 'Leens',
  'Hnnw2hAgPgGiFKouRWvM3fSk3HnYgRv4Xq1PjUEBEuWM': 'Good Trader 1',
  'HYmt1zR8YGMujUWMJCcbg2sTZCKzLGdi9o1dc8xjZDMG': 'Good Trader 2',
  'XDgpjPubjN5soLAFmAMjD2uVR1XZxUKgNpMU6Eo97H7': 'Good Trader 3',
  '8yJFWmVTQq69p6VJxGwpzW7ii7c5J9GRAtHCNMMQPydj': 'Good Trader 7',
  'GoPi2Ri6rpZXZAg8wpLe2UApWtkaVhVbaySMgbZfeJrE': 'Good Trader 4',
  'DkGiBk9TAUUm42rDcPWQqRstMWB4pRvN9WxuBm91WX98': 'Good Trader 9',
  'CgsM7KA8A5cuQ62zmWbCvnJLdXmS3P1rTZteho2i2PA8': 'Good Trader 8',
  'FVxeFYgyT4GC6D7gaLkMSu2qtSJfw2N4RVPZowi2A64Y': 'Good Trader 5',
  '2m5498hY3hpSvm1pVyZwwyU6bpQGFGu3PADSoEoZFXQB': 'Good Trader 6',
  'AbcX4XBm7DJ3i9p29i6sU8WLmiW4FWY5tiwB9D6UBbcE': 'Good Trader 10',
  'BHCm58VsiSq9p3hqjprLAs6wtjXjtuGnz6vj1i3Upe7X': 'Good Trader 11',
  'FpCgGwrowtdTM8hhHtP3o2shRJqThpnodEk3JG1bkPfx': 'JINGTAO(Quant)',
  'suqh5sHtr8HyJ7q8scBimULPkPpA557prMG47xCHQfK': 'Cupsey',
  'HrTZPWV4ZPebBiwyzoTBajCD49kQqVwf4dwsLuYG8CXX': 'Killz',
  '4aDdi3EiDPMbeZ3e5BvbFMt4vfJaoahaHxZuwKQRtFc1': 'Nach',
  '7SDs3PjT2mswKQ7Zo4FTucn9gJdtuW4jaacPA65BseHS': 'Insentos',
  // Add more wallet-nickname mappings here
};

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'POST') {
    const requestBody = await request.json();
    console.log('Received POST request with body:', requestBody);

    // Extract transaction description, timestamp, signature
    const Transferdescription = requestBody[0].description;
    const Transfertimestamp = new Date(requestBody[0].timestamp * 1000).toLocaleString();
    const Transfersignature = `https://solscan.io/tx/${requestBody[0].signature}`;
    
    // Get transaction type and token address
    const { transactionType, tokenAddress, walletAddress } = determineBuyOrSellAndToken(Transferdescription);

    if (transactionType === 'null') {
      console.log('Transaction type is null, not sending message.');
      return new Response('Transaction type is null, not sending message.', { status: 200 });
    }

    const dexscreener = `https://dexscreener.com/solana/${tokenAddress}`;
    const bullx = `https://bullx.io/terminal?chainId=1399811149&address=${tokenAddress}`;
    const photon = `https://photon-sol.tinyastro.io/lp/${tokenAddress}`;
    const neobullx = `https://neo.bullx.io/terminal?chainId=1399811149&address=${tokenAddress}`;
    const trojan = `https://t.me/paris_trojanbot?start=d-phanes-${tokenAddress}`;
    const bloom = `https://t.me/BloomSolana_bot?start=ref_PHANES_ca_${tokenAddress}`;

    let messageToSendTransfer;
    if (nicknames[walletAddress]) {
      messageToSendTransfer = 
        `${transactionType} - ${nicknames[walletAddress]}\n\n` +
        `${Transferdescription}\n\n` +
        `Token Address: <code>${tokenAddress}</code>\n\n` +
        `Wallet Address: <code>${walletAddress}</code>\n\n` +
        `<a href="${Transfersignature}">TX</a>` +
        ` l <a href="${dexscreener}">DEX</a>` +
        ` l <a href="${photon}">PHOTON</a>` +
        ` l <a href="${bullx}">BULLX</a>` +
        ` l <a href="${neobullx}">NEO</a>` +
        ` l <a href="${trojan}">TROJAN</a>` +
        ` l <a href="${bloom}">BLOOM</a>\n` +
        `${Transfertimestamp}`;
    } else {
      messageToSendTransfer = 
        `${transactionType}\n\n` +
        `${Transferdescription}\n\n` +
        `Token Address: <code>${tokenAddress}</code>\n\n` +
        `Wallet Address: <code>${walletAddress}</code>\n\n` +
        `<a href="${Transfersignature}">TX</a>` +
        ` l <a href="${dexscreener}">DEX</a>` +
        ` l <a href="${photon}">PHOTON</a>` +
        ` l <a href="${bullx}">BULLX</a>` +
        ` l <a href="${neobullx}">NEO</a>` +
        ` l <a href="${trojan}">TROJAN</a>` +
        ` l <a href="${bloom}">BLOOM</a>\n` +
        `${Transfertimestamp}`;
    }
    
    await sendToTelegram(messageToSendTransfer, TELEGRAM_MESSAGE_THREAD_ID);

    return new Response('Logged POST request body.', {status: 200});
  } else {
    return new Response('Method not allowed.', {status: 405});
  }
}

function determineBuyOrSellAndToken(description) {
  // Always get the wallet address from the start of the description
  const walletAddress = description.split(' ')[0];

  // Buy pattern: "swapped <amount> SOL for <amount> <token>"
  const buyPattern = /swapped \d+(\.\d+)? SOL for (\d+(\.\d+)?)\s+(\w+)/i;
  // Sell pattern: "<token> for <amount> SOL"
  const sellPattern = /(\w+) for \d+(\.\d+)? SOL/i;

  if (buyPattern.test(description)) {
    const match = description.match(buyPattern);
    const tokenAmount = match[2];
    const tokenAddress = match[4];
    return {
      transactionType: '🟢 BUY',
      tokenAddress: tokenAddress,
      tokenAmount: tokenAmount,
      walletAddress: walletAddress
    };
  } else if (sellPattern.test(description)) {
    const match = description.match(sellPattern);
    const tokenAddress = match[1];
    return {
      transactionType: '🔴 SELL',
      tokenAddress: tokenAddress,
      walletAddress: walletAddress
    };
  }
  return {
    transactionType: 'null',
    tokenAddress: 'N/A',
    tokenAmount: 'N/A',
    walletAddress: 'N/A'
  };
}

async function sendToTelegram(message, threadId) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
      reply_to_message_id: threadId,
      disable_web_page_preview: true
    }),
  });
  const data = await response.json();
  console.log('Telegram response:', data);
}