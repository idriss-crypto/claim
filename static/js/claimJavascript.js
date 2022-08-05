var walletTags = {
    evm: {
        ETH: {
            "Metamask ETH": "5d181abc9dcb7e79ce50e93db97addc1caf9f369257f61585889870555f8c321",
            "Binance ETH": "4b118a4f0f3f149e641c6c43dd70283fcc07eacaa624efc762aa3843d85b2aba",
            "Coinbase ETH": "92c7f97fb58ddbcb06c0d5a7cb720d74bc3c3aa52a0d706e477562cba68eeb73",
            "Exchange ETH": "ec72020f224c088671cfd623235b59c239964a95542713390a2b6ba07dd1151c",
            "Private ETH": "005ba8fbc4c85a25534ac36354d779ef35e0ee31f4f8732b02b61c25ee406edb",
            "Essentials ETH": "3ea9415b82f0ee7db933aab0be377ee1c1a405969d8b8c2454bcce7372a161c2",
            "Rainbow ETH": "992335db5f54ef94a5f23be8b925ed2529b044537c19b59643d39696936b6d6c",
            "Argent ETH": "682614f9b037714bbf001db3a8d6e894fbdcf75cbbb9dea5a42edce33e880072",
            "Tally ETH": "f368de8673a59b860b71f54c7ba8ab17f0b9648ad014797e5f8d8fa9f7f1d11a",
            "Trust ETH": "df3d3f0233e396b2b27c3943269b10ecf2e7c1070a485e1b6b8f2201cb23cb52",
            "Public ETH": "9306eda974cb89b82c0f38ab407f55b6d124159d1fa7779f2e088b2b786573c1",
        },
        BNB: {
            "Metamask BNB": "3bee8eefc6afe6b4f7dbcc024eb3ad4ceaa5e458d34b7877319f2fe9f676e983",
            "Essentials BNB": "639c9abb5605a14a557957fa72e146e9abf727be32e5149dca377b647317ebb9",
        },
        USDT: {
            "Metamask USDT": "74a3d8986c81769ed3bb99b773d66b60852f7ee3fa0d55a6a144523116c671c1",
            "Binance USDT": "77c27c19cc85e24b1d4650800cc4b1bc607986dd3e78608435cececd31c35015",
            "Coinbase USDT": "f2faabf9d133f31a13873ba8a15e676e063a730898ffadfcb0077f723260f563",
            "Exchange USDT": "683e7b694b374ce0d81ba525361fa0c27fff7237eb12ec41b6e225449d5702b9",
            "Private USDT": "8c9a306a7dc200c52d32e3c1fcbf2f65e8037a68127b81807e8e58428004bc57",
            "Essentials USDT": "74dcb573a5c63382484f597ae8034a6153c011e291c01eb3da40e9d83c436a9a",
        },
        USDC: {
            "Metamask USDC": "6f763fea691b1a723ef116e98c02fae07a4397e1a2b4b4c749d06845fa2ff5e4",
            "Binance USDC": "7d2b0e0ee27a341da84ce56e95eb557988f9d4ff95fe452297fc765265bb27a2",
            "Coinbase USDC": "6fe7c1a2fdd154e0b35283598724adee9a5d3b2e6523787d8b6de7cd441f15ca",
            "Exchange USDC": "8c4a231c47a4cfa7530ba4361b6926da4acd87f569167b8ba55b268bf99640d0",
            "Private USDC": "54c9da06ab3d7c6c7f813f36491b22b7f312ae8f3b8d12866d35b5d325895e3e",
            "Essentials USDC": "23a66df178daf25111083ee1610fb253baf3d12bd74c6c2aae96077558e3737a",
        },
        ELA: {
            "Essentials ELA SC": "c17c556467fe7c9fe5667dde7ca8cdbca8a24d0473b9e9c1c2c8166c1f355f6c",
        },
        MATIC: {
            "Essentials MATIC": "336fb6cdd7fec196c6e66966bd1c326072538a94e700b8bc1111d1574b8357ba",
        },
        BTC: {
            "Essentials BTC SC": "39d18497a64591bb1b061940309c453495398d00f9d9deab8b2c1e0979e4cbe7",
        },
        ERC20: {
            "ERC20": "63d95e64e7caff988f97fdf32de5f16624f971149749c90fbc7bbe44244d3ced",
        },
    },
    btc: {
        BTC: {
            "Binance BTC": "450efeca15651e50995ed494ac24a945e61d67f60bed0dbb3b2d8d7df122a8ca",
            "Coinbase BTC": "b3c77df93f865dd21a6196266d5c291adad15c7db9c81ddc78409a22f36ebe84",
            "Exchange BTC": "a3f104cace8d66ed9971b19f749a821ae4397349155ea1a8724451c3e680335b",
            "Private BTC": "a7d3f51b26dad11f5f4842d29f2fc419a48e3471bdec0a2c713c7d18d3143d65",
        },
        ELA: {
            "Essentials ELA": "35ae820c72397977701524ee610e7ef2ca3d64539ccdc65e5198470d8e49eccb",
        },
    },
    sol: {
        SOL: {
            "Solana SOL": "62994eac84217f90c44d7acf962861f044a5f2e653400c154a8bcbf114da16fb",
            "Coinbase SOL": "b5a72b6402de8a0fa649e23c81ae165dcfcce22c960a4a67a218243a73f49b1f",
            "Trust SOL": "70190458e6435ad1e8f575ac60a7d8542ae5a4927aba336789de377a47b839d4",
            "Binance SOL": "19cd4e6feb1efb40eb6506fb448a22cefeb63690ecaa35fee65914607adee606",
            "Phantom SOL": "88f5c6ddb68a1cee77543f2de2788ade913b87bbac1c38d354707bc8ee3a0328",
        },
    },
};

walletTagsReverse = {
    "Metamask ETH": "MM_ETH",
    "Binance ETH": "BINANCE_ETH",
    "Coinbase ETH": "COINBASE_ETH",
    "Exchange ETH": "EXCHANGE_ETH",
    "Private ETH": "PRIVATE_ETH",
    "ERC20": "ERC20",
    "Essentials ETH": "ESSENTIALS_ETH",
    "Rainbow ETH": "RAINBOW_ETH",
    "Argent ETH": "ARGENT_ETH",
    "Tally ETH": "TALLY_ETH",
    "Trust ETH": "TRUST_ETH",
    "Metamask USDT": "METAMASK_USDT",
    "Binance USDT": "BINANCE_USDT",
    "Coinbase USDT": "COINBASE_USDT",
    "Exchange USDT": "EXCHANGE_USDT",
    "Private USDT": "PRIVATE_USDT",
    "Essentials USDT": "ESSENTIALS_USDT",
    "Metamask USDC": "METAMASK_USDC",
    "Binance USDC": "BINANCE_USDC",
    "Coinbase USDC": "COINBASE_USDC",
    "Exchange USDC": "EXCHANGE_USDC",
    "Private USDC": "PRIVATE_USDC",
    "Essentials USDC": "ESSENTIALS_USDC",
    "Metamask BNB": "METAMASK_BNB",
    "Essentials BNB": "ESSENTIALS_BNB",
    "Essentials ELA SC": "ESSENTIALS_ELA_SC",
    "Essentials MATIC": "ESSENTIAL_MATIC",
    "Public ETH": "TWITTER"
};

pubETHTag = "9306eda974cb89b82c0f38ab407f55b6d124159d1fa7779f2e088b2b786573c1"

const regPh = /^(\+\(?\d{1,4}\s?)\)?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;
const regM = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const regT = /^@[a-zA-Z0-9_]{1,15}$/;

async function loadPaymentMATIC(web3_) {
    return await new web3_.eth.Contract(
        [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"}],"name":"AdminAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"}],"name":"AdminDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"delegateHandle","type":"string"},{"indexed":true,"internalType":"address","name":"delegateAddress","type":"address"}],"name":"DelegateAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"delegateHandle","type":"string"},{"indexed":true,"internalType":"address","name":"delegateAddress","type":"address"}],"name":"DelegateDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"payer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"paymentId_hash","type":"bytes32"},{"indexed":true,"internalType":"string","name":"IDrissHash","type":"string"},{"indexed":false,"internalType":"uint256","name":"date","type":"uint256"}],"name":"PaymentDone","type":"event"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"IDrissHashes","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adminAddress","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegateAddress","type":"address"},{"internalType":"string","name":"delegateHandle","type":"string"}],"name":"addDelegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegateAddress","type":"address"},{"internalType":"string","name":"delegateHandle","type":"string"},{"internalType":"uint256","name":"percentage","type":"uint256"}],"name":"addDelegateException","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"amounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"delegate","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adminAddress","type":"address"}],"name":"deleteAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"delegateHandle","type":"string"}],"name":"deleteDelegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"receiptId","type":"string"},{"internalType":"address","name":"paymAddr","type":"address"}],"name":"hashReceipt","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes32","name":"paymentId_hash","type":"bytes32"},{"internalType":"string","name":"IDrissHash","type":"string"},{"internalType":"string","name":"delegateHandle","type":"string"}],"name":"payNative","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"receipts","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferContractOwnership","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"receiptId","type":"string"},{"internalType":"address","name":"paymAddr","type":"address"}],"name":"verifyReceipt","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"delegateHandle","type":"string"}],"name":"withdraw","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"}],
        "0x066d3AE28E017Ac1E08FA857Ec68dfdC7de82a54"
    );
}

async function loadPaymentMATICTestnet(web3_) {
    return await new web3_.eth.Contract(
        [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"}],"name":"AdminAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"}],"name":"AdminDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"delegateHandle","type":"string"},{"indexed":true,"internalType":"address","name":"delegateAddress","type":"address"}],"name":"DelegateAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"delegateHandle","type":"string"},{"indexed":true,"internalType":"address","name":"delegateAddress","type":"address"}],"name":"DelegateDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"payer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"paymentId_hash","type":"bytes32"},{"indexed":true,"internalType":"string","name":"IDrissHash","type":"string"},{"indexed":false,"internalType":"uint256","name":"date","type":"uint256"}],"name":"PaymentDone","type":"event"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"IDrissHashes","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adminAddress","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegateAddress","type":"address"},{"internalType":"string","name":"delegateHandle","type":"string"}],"name":"addDelegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegateAddress","type":"address"},{"internalType":"string","name":"delegateHandle","type":"string"},{"internalType":"uint256","name":"percentage","type":"uint256"}],"name":"addDelegateException","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"amounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"delegate","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adminAddress","type":"address"}],"name":"deleteAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"delegateHandle","type":"string"}],"name":"deleteDelegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"receiptId","type":"string"},{"internalType":"address","name":"paymAddr","type":"address"}],"name":"hashReceipt","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes32","name":"paymentId_hash","type":"bytes32"},{"internalType":"string","name":"IDrissHash","type":"string"},{"internalType":"string","name":"delegateHandle","type":"string"}],"name":"payNative","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"receipts","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferContractOwnership","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"receiptId","type":"string"},{"internalType":"address","name":"paymAddr","type":"address"}],"name":"verifyReceipt","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"delegateHandle","type":"string"}],"name":"withdraw","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"}],
        "0x2EcCb53ca2d4ef91A79213FDDF3f8c2332c2a814"
    );
}

function lowerFirst(string_) {
    return string_.charAt(0).toLowerCase() + string_.slice(1);
}

function convertPhone(string_) {
    // allow for letters because secret word can follow phone number
    return "+" + string_.replace(/[^\da-zA-Z]/, "")
}


async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
}

// check device type
function deviceType(){
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)){
        return "tablet";
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)){
        return "mobile";
    }
    return "desktop";
};

//NAV BAR
//Connecting wallet
//Connecting wallet
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const evmChains = window.evmChains;
const WalletLink = window.WalletLink;

// set default web3 + provider for frontend checks w/o connecting wallet
const defaultWeb3 = new Web3(new Web3.providers.HttpProvider("https://rpc.ankr.com/polygon"));

// Web3modal instance
let web3Modal;

// web3 for chosen wallet
let web3;
let fm;


// Address of the selected account
let account;
let selectedAccount;
let idHash;
let paid;

// Load our smart contract
async function loadContract() {
    return await new defaultWeb3.eth.Contract(
        [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"}],"name":"AdminAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"}],"name":"AdminDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Decrement","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"string","name":"hash","type":"string"}],"name":"IDrissAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"string","name":"hash","type":"string"}],"name":"IDrissDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousIDrissOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newIDrissOwner","type":"address"}],"name":"IDrissOwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Increment","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"}],"name":"NewPrice","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"IDrissOwners","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adminAddress","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"hashPub","type":"string"},{"internalType":"string","name":"hashID","type":"string"},{"internalType":"string","name":"address_","type":"string"},{"internalType":"address","name":"ownerAddress","type":"address"}],"name":"addIDriss","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"hashPub","type":"string"},{"internalType":"string","name":"hashID","type":"string"},{"internalType":"string","name":"address_","type":"string"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"ownerAddress","type":"address"}],"name":"addIDrissToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"countAdding","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"countDeleting","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"creationTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adminAddress","type":"address"}],"name":"deleteAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"hashPub","type":"string"}],"name":"deleteIDriss","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"hashPub","type":"string"}],"name":"getIDriss","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"payDates","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferContractOwnership","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"hashPub","type":"string"},{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferIDrissOwnership","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenContract","type":"address"}],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"}],
        "0x2EcCb53ca2d4ef91A79213FDDF3f8c2332c2a814"
    );
}

// Contract to interact with for payment
let contract;

const MATICOptions = {
  /* Smart Chain mainnet RPC URL */
  rpcUrl: 'https://rpc-mainnet.maticvigil.com/',
  chainId: 137 // Smart Chain mainnet chain id
}

const MATICOptionsTestnet = {
  /* Smart Chain mainnet RPC URL */
  rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
  chainId: 80001 // Smart Chain mainnet chain id
}

let TallyOpts = {
    "custom-tally": {
        display: {
            logo: "../static/images/tally.svg",
            name: "Tally",
            description: "Coming Soon",
        },
        package: true,
        connector: async () => {
            if (!isTallyInstalled()) {
                    window.open("https://tally.cash/community-edition", '_blank'); // <-- LOOK HERE
                    throw new Error("Tally not supported yet.");
                }

                let provider = null;
                if (typeof window.ethereum !== 'undefined') {

                    provider = window.ethereum
                    try {
                        await provider.request({ method: 'eth_requestAccounts' });
                    } catch (error) {
                        throw new Error("User Rejected");
                    }
                } else {
                    throw new Error("No Tally Wallet found");
                }
                console.log("Tally provider", provider);
                return provider;
        },
    },
};

let WalletConnectOpts = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            rpc: {
                137: "https://polygon-rpc.com/",
            },
            chainId: 137,
        },
    },
};

let MetaMaskOpts = {
    "custom-metamask": {
        display: {
            logo: "../static/images/metamask-logo.svg",
            name: "MetaMask",
            description: "Connect to your MetaMask Wallet",
        },
        package: true,
        connector: async () => {
            if (!isMetaMaskInstalled()) {
                window.open("https://metamask.io/download/", "_blank"); // <-- LOOK HERE
                return;
            }

            let provider = null;
            if (typeof window.ethereum !== "undefined") {
                let providers = window.ethereum.providers;
                if (providers){
                    provider = providers.find(p => p.isMetaMask);
                } else {
                    provider = window.ethereum
                }
                try {
                    await provider.request({ method: "eth_requestAccounts" });
                } catch (error) {
                    throw new Error("User Rejected");
                }
            } else {
                throw new Error("No MetaMask Wallet found");
            }
            console.log("MetaMask provider", provider);
            return provider;
        },
    },
};

let WalletLinkOpts = {
    "custom-walletlink": {
        display: {
            logo: "../static/images/coinbase.svg",
            name: "Coinbase",
            description: "Scan with WalletLink to connect",
        },
        options: {
            appName: "IDriss", // Your app name
            rpc: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
            chainId: 1,
        },
        package: WalletLink,
        connector: async (_, options) => {
            const { appName, networkUrl, chainId } = options;
            const walletLink = new WalletLink({
                appName,
            });
            const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
            await provider.enable();
            return provider;
        },
    },
};

const providerOptions = {
    ...WalletConnectOpts,
    ...WalletLinkOpts
}

if (deviceType() === "desktop") {
    Object.assign(providerOptions, MetaMaskOpts);
    Object.assign(providerOptions, TallyOpts);
}


async function init(providerInfo) {
    console.log(providerInfo)
    if (providerInfo == "fm") {
        // Setting network to Smart Chain
        // pk_live_05E291BB168EC551
        fm = new Fortmatic('pk_test_589EBE0E7D8CB015', MATICOptionsTestnet);
        web3 = new Web3(fm.getProvider());
        // let people sign in or up
        await web3.currentProvider.enable();
    } else {
        web3Modal = new Web3Modal({
            network: 'mainnet',
            cacheProvider: false, // optional
            providerOptions, // required
            disableInjectedProvider: true, // optional. For MetaMask / Brave / Opera.
        });
        try {
            console.log("Trying to connect!");
            document.getElementsByClassName("web3modal-modal-lightbox")[0].style.zIndex = "100";
            provider = await web3Modal.connect();
            web3 = new Web3(provider);
            console.log("Connected!");
            await switchtopolygon();
            accounts = await web3.eth.getAccounts();
            account = accounts[0];
            console.log(account)
        } catch(e) {
            console.log("Could not get a wallet connection", e);
            return;
        }
    }

    // get wallet address
    accounts = await web3.eth.getAccounts();
    console.log(accounts)
    selectedAccount = accounts[0];

    document.getElementById("identifierTemp").style.display = '';
}



async function signUp() {
    identifierInput = document.getElementById("identifierInput").value;
    const result = await IdrissCrypto.AuthorizationTestnet.CreateOTP("Public ETH", identifierInput, selectedAccount)
    console.log(result.sessionKey)

    idHash = result.hash
    sessionKey = result.sessionKey
    document.getElementById("validateDiv").style.display = "";

    if (identifierInput.match(regT)) {
        twitterId = result.twitterId
        showTwitterVerification(result.twitterMsg)
        console.log(result.twitterMsg)
    } else {
        document.getElementById("OTP").style.display = "";
    }

}

// check if posted/OTP correct
async function validate() {
console.log("validate called")
    let valid;
    if (document.getElementById("OTPInput").value) {
        valid = await IdrissCrypto.AuthorizationTestnet.ValidateOTP(document.getElementById("OTPInput").value, sessionKey);
    } else {
        valid = await IdrissCrypto.AuthorizationTestnet.ValidateOTP("0", sessionKey);
    }
    paymentContract = await loadPaymentMATICTestnet(web3);
    console.log(String(valid.receiptID))
    receipt_hash = await paymentContract.methods.hashReceipt(String(valid.receiptID), selectedAccount).call();
    if (!paid) {
        console.log(valid.gas)
        await paymentContract.methods.payNative(receipt_hash, idHash, "IDriss").send({ from: selectedAccount, value: 0, gasPrice: valid.gas });
        paid = true
    }
    checkedPayment = await IdrissCrypto.AuthorizationTestnet.CheckPayment("MATIC", sessionKey);
    console.log("Success")
    // Now claim call
}

function showTwitterVerification(msg_) {
    document.getElementById("twitterMsg").style.display = "";
    document.getElementById("tweetContent").innerText = msg_;
}

async function copyTweet() {
    let content = document.getElementById("tweetContent").innerHTML;
    await navigator.clipboard.writeText(content);
    document.getElementById("tooltip").style.visibility = "visible";
    setTimeout(function () {
                    tooltip.style.visibility = "hidden";
                }, 1000);
}

function isMetaMaskInstalled(){
    if (window.ethereum.isMetaMask) {
        return true
    }
    else {
        return false
    }
}

function isTallyInstalled(){
    if (window.ethereum.isTally) {
        return true
    }
    else {
        return false
    }
}

// add switch to other chains for other payments
async function switchtopolygon() {
    const web3 = new Web3(provider);

    //  rpc method?
    console.log("Checking chain...")
    const chainId = await web3.eth.getChainId();
    console.log(chainId);

    // check if correct chain is connected
    console.log("Connected to chain ", chainId)
    if (chainId != 137) {
        console.log("Switch to Polygon requested")
        try {
            await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x89' }],
        });
        } catch (switchError) {
        console.log(switchError)
            if (switchError.message === "JSON RPC response format is invalid") {
                throw "network1"
            }
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await provider.request({
                    method: 'wallet_addEthereumChain',
                    params: [{ chainId: '0x89', chainName: 'Matic', rpcUrls: ['https://polygon-rpc.com/'], nativeCurrency: {name: 'MATIC', symbol: 'MATIC', decimals: 18}}],
                    });
                } catch (addError) {

                    alert("Please add Polygon network to continue.");
                }
            }
            console.log("Please switch to Polygon network.");
            // disable continue buttons here
            token = "MATIC";
            throw "network"
        }
    }
}