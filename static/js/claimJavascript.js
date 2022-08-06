let identifier
let claimPassword
let idriss
let userHash
let rpcEndpoint
let polygonChainId
let loadPaymentMaticContractAddress
let sendToAnyoneContractAddress
let idrissRegistryContractAddress
let priceOracleContractAddress
let sendToAnyoneContract
const ENV = 'local'
let paymentsToClaim = []

const walletType = {
    coin: 'ETH',
    network: 'evm',
    walletTag: 'Public ETH'
}

//TODO: check contract addresses for test and prod
switch (ENV) {
    // local hardhat
    case "local":
        loadPaymentMaticContractAddress = "0x2EcCb53ca2d4ef91A79213FDDF3f8c2332c2a814"
        polygonChainId = 1337
        rpcEndpoint = 'http://localhost:8545'
        sendToAnyoneContractAddress = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'
        idrissRegistryContractAddress = '0xA3307BF348ACC4bEDdd67CCA2f7F0c4349d347Db'
        priceOracleContractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
        break;
    //Mumbai
    case "development":
        loadPaymentMaticContractAddress = "0x2EcCb53ca2d4ef91A79213FDDF3f8c2332c2a814"
        rpcEndpoint = 'https://rpc-mumbai.maticvigil.com/'
        sendToAnyoneContractAddress = ''
        idrissRegistryContractAddress = ''
        priceOracleContractAddress = ''
        break;
    //mainnet
    case "production":
        loadPaymentMaticContractAddress = "0x066d3AE28E017Ac1E08FA857Ec68dfdC7de82a54"
        rpcEndpoint = "https://rpc.ankr.com/polygon"
        sendToAnyoneContractAddress = ''
        idrissRegistryContractAddress = ''
        priceOracleContractAddress = ''
        break;
}

// set default web3 + provider for frontend checks w/o connecting wallet
let defaultWeb3

document.addEventListener('DOMContentLoaded', async () => {
    let provider = new Web3.providers.HttpProvider(rpcEndpoint)
    defaultWeb3 = new Web3(provider)
    let params = new URL(document.location).searchParams;
    identifier = params.get('identifier');
    claimPassword = params.get('claimPassword')
    console.log({identifier, claimPassword})
    idriss = new IdrissCrypto.IdrissCrypto(rpcEndpoint, {
        web3Provider: provider,
        sendToAnyoneContractAddress,
        idrissRegistryContractAddress,
        priceOracleContractAddress,
    })
    const walletType = {
        network: 'evm',
        coin: 'ETH',
        walletTag: 'Public ETH',
    }
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
    } else {
        window.web3 = defaultWeb3
    }

    if (identifier && claimPassword) {
        userHash = await idriss.getHashForIdentifier(identifier, walletType, claimPassword)
        console.log(`userhash = ${userHash}`)
        let userHashForClaim = await idriss.getUserHash(walletType, identifier)
        console.log(`userhashForClaim = ${userHashForClaim}`)
        sendToAnyoneContract = await loadSendToAnyoneContract(window.web3)
        const events = await sendToAnyoneContract.getPastEvents('AssetTransferred',{
            filter: {toHash: userHash},
            fromBlock: 'earliest',
            toBlock: 'latest'
        })

        for (let i = 0; i < events.length; i++) {
            // defaultWeb3.utils.fromWei(events[0].returnValues.amount)
            paymentsToClaim.push({
                amount: events[i].returnValues.amount,
                assetContractAddress: events[i].returnValues.assetContractAddress,
                from: events[i].returnValues.from,
                toHash: events[i].returnValues.toHash
            })
        }

        console.log(events)
        console.log(paymentsToClaim)
    }
})
pubETHTag = "9306eda974cb89b82c0f38ab407f55b6d124159d1fa7779f2e088b2b786573c1"

const regPh = /^(\+\(?\d{1,4}\s?)\)?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;
const regM = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const regT = /^@[a-zA-Z0-9_]{1,15}$/;

async function loadPaymentMATIC(web3_) {
    return await new web3_.eth.Contract(
        [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"}],"name":"AdminAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"}],"name":"AdminDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"delegateHandle","type":"string"},{"indexed":true,"internalType":"address","name":"delegateAddress","type":"address"}],"name":"DelegateAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"delegateHandle","type":"string"},{"indexed":true,"internalType":"address","name":"delegateAddress","type":"address"}],"name":"DelegateDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"payer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"paymentId_hash","type":"bytes32"},{"indexed":true,"internalType":"string","name":"IDrissHash","type":"string"},{"indexed":false,"internalType":"uint256","name":"date","type":"uint256"}],"name":"PaymentDone","type":"event"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"IDrissHashes","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adminAddress","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegateAddress","type":"address"},{"internalType":"string","name":"delegateHandle","type":"string"}],"name":"addDelegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegateAddress","type":"address"},{"internalType":"string","name":"delegateHandle","type":"string"},{"internalType":"uint256","name":"percentage","type":"uint256"}],"name":"addDelegateException","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"amounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"delegate","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adminAddress","type":"address"}],"name":"deleteAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"delegateHandle","type":"string"}],"name":"deleteDelegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"receiptId","type":"string"},{"internalType":"address","name":"paymAddr","type":"address"}],"name":"hashReceipt","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes32","name":"paymentId_hash","type":"bytes32"},{"internalType":"string","name":"IDrissHash","type":"string"},{"internalType":"string","name":"delegateHandle","type":"string"}],"name":"payNative","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"receipts","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferContractOwnership","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"receiptId","type":"string"},{"internalType":"address","name":"paymAddr","type":"address"}],"name":"verifyReceipt","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"delegateHandle","type":"string"}],"name":"withdraw","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"}],
        loadPaymentMaticContractAddress
    );
}

async function loadSendToAnyoneContract(web3_) {
    return await new web3_.eth.Contract(
        [{"inputs":[{"internalType":"address","name":"_IDrissAddr","type":"address"},{"internalType":"address","name":"_maticUsdAggregator","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"toHash","type":"bytes32"},{"indexed":true,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":true,"internalType":"address","name":"assetContractAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AssetClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"fromHash","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"toHash","type":"bytes32"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"assetContractAddress","type":"address"}],"name":"AssetMoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"toHash","type":"bytes32"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"assetContractAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AssetTransferReverted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"toHash","type":"bytes32"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"assetContractAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AssetTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"IDRISS_ADDR","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMAL_PAYMENT_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMAL_PAYMENT_FEE_DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAYMENT_FEE_PERCENTAGE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAYMENT_FEE_PERCENTAGE_DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAYMENT_FEE_SLIPPAGE_PERCENT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_IDrissHash","type":"bytes32"},{"internalType":"enum AssetType","name":"_assetType","type":"uint8"},{"internalType":"address","name":"_assetContractAddress","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minimalPaymentFee","type":"uint256"},{"internalType":"uint256","name":"_paymentFeeDenominator","type":"uint256"}],"name":"changeMinimalPaymentFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_paymentFeePercentage","type":"uint256"},{"internalType":"uint256","name":"_paymentFeeDenominator","type":"uint256"}],"name":"changePaymentFeePercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_IDrissHash","type":"string"},{"internalType":"string","name":"_claimPassword","type":"string"},{"internalType":"enum AssetType","name":"_assetType","type":"uint8"},{"internalType":"address","name":"_assetContractAddress","type":"address"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimPaymentFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_IDrissHash","type":"string"},{"internalType":"string","name":"_claimPassword","type":"string"}],"name":"hashIDrissWithPassword","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_FromIDrissHash","type":"bytes32"},{"internalType":"bytes32","name":"_ToIDrissHash","type":"bytes32"},{"internalType":"enum AssetType","name":"_assetType","type":"uint8"},{"internalType":"address","name":"_assetContractAddress","type":"address"}],"name":"moveAssetToOtherHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paymentFeesBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_IDrissHash","type":"bytes32"},{"internalType":"enum AssetType","name":"_assetType","type":"uint8"},{"internalType":"address","name":"_assetContractAddress","type":"address"}],"name":"revertPayment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_IDrissHash","type":"bytes32"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"enum AssetType","name":"_assetType","type":"uint8"},{"internalType":"address","name":"_assetContractAddress","type":"address"},{"internalType":"uint256","name":"_assetId","type":"uint256"}],"name":"sendToAnyone","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}],
        sendToAnyoneContractAddress
    );
}
async function loadPaymentMATICTestnet(web3_) {
    return await new web3_.eth.Contract(
        [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"}],"name":"AdminAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"}],"name":"AdminDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"delegateHandle","type":"string"},{"indexed":true,"internalType":"address","name":"delegateAddress","type":"address"}],"name":"DelegateAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"delegateHandle","type":"string"},{"indexed":true,"internalType":"address","name":"delegateAddress","type":"address"}],"name":"DelegateDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"payer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"paymentId_hash","type":"bytes32"},{"indexed":true,"internalType":"string","name":"IDrissHash","type":"string"},{"indexed":false,"internalType":"uint256","name":"date","type":"uint256"}],"name":"PaymentDone","type":"event"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"IDrissHashes","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adminAddress","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegateAddress","type":"address"},{"internalType":"string","name":"delegateHandle","type":"string"}],"name":"addDelegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegateAddress","type":"address"},{"internalType":"string","name":"delegateHandle","type":"string"},{"internalType":"uint256","name":"percentage","type":"uint256"}],"name":"addDelegateException","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"amounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"delegate","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adminAddress","type":"address"}],"name":"deleteAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"delegateHandle","type":"string"}],"name":"deleteDelegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"receiptId","type":"string"},{"internalType":"address","name":"paymAddr","type":"address"}],"name":"hashReceipt","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes32","name":"paymentId_hash","type":"bytes32"},{"internalType":"string","name":"IDrissHash","type":"string"},{"internalType":"string","name":"delegateHandle","type":"string"}],"name":"payNative","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"receipts","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferContractOwnership","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"receiptId","type":"string"},{"internalType":"address","name":"paymAddr","type":"address"}],"name":"verifyReceipt","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"delegateHandle","type":"string"}],"name":"withdraw","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"}],
        loadPaymentMaticContractAddress
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
  rpcUrl: rpcEndpoint,
  chainId: polygonChainId // Smart Chain mainnet chain id
}

const MATICOptionsTestnet = {
  rpcUrl: rpcEndpoint,
    chainId: polygonChainId
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
        // Setting network to polygon testnet
        // key for mainnet:
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
            // switch to polygon network (mainnet!)
            // for testnet check, please select provider = fm
            await switchtopolygon();
        } catch(e) {
            console.log("Could not get a wallet connection", e);
            return;
        }
    }

    // get wallet address
    accounts = await web3.eth.getAccounts();
    console.log(accounts)
    selectedAccount = accounts[0];

    document.getElementById("identifierInput").value = identifier
    document.getElementById("identifierTemp").style.display = '';
    document.getElementById("DivStep3").style.display = '';
    document.getElementById("DivStep2").style.display = 'none';
}

// should be triggered automatically based on identifier information.
// connect wallet first
// check if IDriss is already registered an go straight to claim method?
// idriss = new IdrissCrypto.IdrissCrypto()
// idriss.resolve(identifier) -> check if Public ETH tag is found
// or call contract directly with specific IDrissHash
async function signUp() {
    // identifier based on param in url
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
    /*
    console.log("validate called")
    let valid;
    // call validateOTP only once?
    if (document.getElementById("OTPInput").value) {
        valid = await IdrissCrypto.AuthorizationTestnet.ValidateOTP(document.getElementById("OTPInput").value, sessionKey);
    } else {
        valid = await IdrissCrypto.AuthorizationTestnet.ValidateOTP("0", sessionKey);
    }
    paymentContract = await loadPaymentMATICTestnet(web3);
    // valid.receiptID should be string already
    // create receiptID for verification
    console.log(String(valid.receiptID))
    receipt_hash = await paymentContract.methods.hashReceipt(String(valid.receiptID), selectedAccount).call();
    // let people pay only once
    // add "checkPayment" in case paid is true?
    if (!paid) {
        console.log(valid.gas)
        // somehow wait for faucet money to arrive?
        // faucet gas is sent in ValidateOTP with high gas fee, so should arrive relatively quickly
        // wallet shows very high gas if no funds are available
        await paymentContract.methods.payNative(receipt_hash, idHash, "IDriss").send({ from: selectedAccount, value: 0, gasPrice: valid.gas });
        paid = true
    }
    // if successful creates link on registry
    checkedPayment = await IdrissCrypto.AuthorizationTestnet.CheckPayment("MATIC", sessionKey);
     */
    console.log("Success")
    //TODO: add support for tokens and nfts
    claim(paymentsToClaim[0].amount, 0, paymentsToClaim[0].assetContractAddress)
}

async function claim(amount, assetType, assetContractAddress, assetId = 0) {
    //init again to get new connected provider
    idriss = new IdrissCrypto.IdrissCrypto(rpcEndpoint, {
        web3Provider: web3.currentProvider,
        sendToAnyoneContractAddress,
        idrissRegistryContractAddress,
        priceOracleContractAddress,
    })
    const asset = {
        amount,
        type: assetType,
        assetContractAddress,
        // assetId
    }
    console.log("inside claim")
    console.log({userHash, identifier, walletType, asset})
    //TODO: start waiting animation
    let result
    await idriss.claim(identifier, claimPassword, walletType, asset)
        .then((res) => {
            result = res
        }).catch((e) => {
            console.log(e)
        })
    //TODO: end waiting animation
    console.log(result)
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
    const chainIdHex = defaultWeb3.utils.toHex(polygonChainId)
    if (chainId != polygonChainId) {
        console.log("Switch to Polygon requested")
        try {
            await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainIdHex }],
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
                    params: [{ chainId: chainIdHex, chainName: 'Matic', rpcUrls: [rpcEndpoint], nativeCurrency: {name: 'MATIC', symbol: 'MATIC', decimals: 18}}],
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


// to delete an IDriss:
// to delete an IDriss:
//async function loadContract(web3_) {
//    return await new web3_.eth.Contract(
//        [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"}],"name":"AdminAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"}],"name":"AdminDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Decrement","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"string","name":"hash","type":"string"}],"name":"IDrissAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"string","name":"hash","type":"string"}],"name":"IDrissDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousIDrissOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newIDrissOwner","type":"address"}],"name":"IDrissOwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Increment","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"}],"name":"NewPrice","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"IDrissOwners","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adminAddress","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"hashPub","type":"string"},{"internalType":"string","name":"hashID","type":"string"},{"internalType":"string","name":"address_","type":"string"},{"internalType":"address","name":"ownerAddress","type":"address"}],"name":"addIDriss","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"hashPub","type":"string"},{"internalType":"string","name":"hashID","type":"string"},{"internalType":"string","name":"address_","type":"string"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"ownerAddress","type":"address"}],"name":"addIDrissToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"countAdding","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"countDeleting","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"creationTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adminAddress","type":"address"}],"name":"deleteAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"hashPub","type":"string"}],"name":"deleteIDriss","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"hashPub","type":"string"}],"name":"getIDriss","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"payDates","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferContractOwnership","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"hashPub","type":"string"},{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferIDrissOwnership","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenContract","type":"address"}],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"}],
//        "0x6489a077e9d1382e87a493985c531bee2d484640"
//    );
//}
// contract = await loadContract(web3);
// await contract.methods.deleteIDriss(hash_).send({ from: selectedAccount, value: 0});

// to send 0 value transaction for cancelling stuck transactin on fortmatic:

//const toAddress = '0xc62d0142c91Df69BcdfC13954a87d6Fe1DdfdEd6';
//const sendValue = web3.utils.toWei(String(0.35), 'ether');

//web3.eth.getAccounts((error, accounts) => {
//  if (error) throw error;
//
//  // Construct Ether transaction params
//  const txnParams = {
//    from: accounts[0],
//    to: toAddress,
//    value: sendValue,
//      gasPrice: web3.utils.toWei('0.00000005', 'ether')
//  }
//
//  // Send Ether transaction with web3
//  web3.eth.sendTransaction(txnParams, (error, txnHash) => {
//    if (error) throw error;
//    console.log(txnHash);
//  });
//});