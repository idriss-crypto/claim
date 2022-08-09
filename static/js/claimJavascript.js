let identifier
let claimPassword
let idriss
let userHash
let userHashForClaim
let rpcEndpoint
let polygonChainId
let loadPaymentMaticContractAddress
let sendToAnyoneContractAddress
let idrissRegistryContractAddress
let priceOracleContractAddress
let sendToAnyoneContract
const ENV = 'production'
let paymentsToClaim = []
const defaultWeb3Polygon = new Web3(new Web3.providers.HttpProvider("https://rpc.ankr.com/polygon"));

const walletType = {
    coin: 'ETH',
    network: 'evm',
    walletTag: 'Public ETH'
}
// use universal token list and api fo pricing in the future
let oracleAddress = {
    ethereum: {
        ETH: ["0xf9680d99d6c9589e2a93a78a04a279e509205945", 18],
        "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": ["0xfe4a8cc5b5b2366c1b58bea3858e81843581b2f7", 6], // USDC ETH
        "0xdAC17F958D2ee523a2206206994597C13D831ec7": ["0x0a6513e40db6eb1b165753ad52e80663aea50545", 6], // USDT ETH
        "0x6B175474E89094C44Da98b954EedeAC495271d0F": ["0x4746dec9e833a82ec7c2c1356372ccf2cfcd2f3d", 18], // DAI ETH
    },
    polygon: {
        "0x0000000000000000000000000000000000000000": ["0xab594600376ec9fd91f8e885dadf0ce036862de0", 18], // MATIC Polygon
        "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619": ["0xf9680d99d6c9589e2a93a78a04a279e509205945", 18], // WETH Polygon
        "0x2791bca1f2de4661ed88a30c99a7a9449aa84174": ["0xfe4a8cc5b5b2366c1b58bea3858e81843581b2f7", 6], // USDC Polygon
        "0xc2132d05d31c914a87c6611c10748aeb04b58e8f": ["0x0a6513e40db6eb1b165753ad52e80663aea50545", 6], // USDT Polygon
        "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063": ["0x4746dec9e833a82ec7c2c1356372ccf2cfcd2f3d", 18], // DAI Polygon
    },
    bsc: {
        BNB: ["0x82a6c4af830caa6c97bb504425f6a66165c2c26e", 18],
        "0x2170Ed0880ac9A755fd29B2688956BD959F933F8": ["0xf9680d99d6c9589e2a93a78a04a279e509205945", 18], // WETH BSC
        "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d": ["0xfe4a8cc5b5b2366c1b58bea3858e81843581b2f7", 18], // USDC BSC
        "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3": ["0x4746dec9e833a82ec7c2c1356372ccf2cfcd2f3d", 18], // DAI BSC
        "0xbA2aE424d960c26247Dd6c32edC70B295c744C43": ["0xbaf9327b6564454f4a3364c33efeef032b4b4444", 8], // DOGE BSC
    },
};
// add ids of token not supported in chainlink oracles
let coingeckoId = {
    ethereum: {
        "0xf0f9d895aca5c8678f706fb8216fa22957685a13": ["cult-dao", 18], // CULT ETH
    },
    polygon: {
        "0xf0f9D895aCa5c8678f706FB8216fa22957685A13": ["revolt-2-earn", 18], // RVLT Polygon
    },
};

async function loadOracle(network, assetContract) {
    let abiOracle = [{inputs:[{internalType:"address",name:"_aggregator",type:"address",},{internalType:"address",name:"_accessController",type:"address",},],stateMutability:"nonpayable",type:"constructor",},{anonymous:false,inputs:[{indexed:true,internalType:"int256",name:"current",type:"int256",},{indexed:true,internalType:"uint256",name:"roundId",type:"uint256",},{indexed:false,internalType:"uint256",name:"updatedAt",type:"uint256",},],name:"AnswerUpdated",type:"event",},{anonymous:false,inputs:[{indexed:true,internalType:"uint256",name:"roundId",type:"uint256",},{indexed:true,internalType:"address",name:"startedBy",type:"address",},{indexed:false,internalType:"uint256",name:"startedAt",type:"uint256",},],name:"NewRound",type:"event",},{anonymous:false,inputs:[{indexed:true,internalType:"address",name:"from",type:"address",},{indexed:true,internalType:"address",name:"to",type:"address",},],name:"OwnershipTransferRequested",type:"event",},{anonymous:false,inputs:[{indexed:true,internalType:"address",name:"from",type:"address",},{indexed:true,internalType:"address",name:"to",type:"address",},],name:"OwnershipTransferred",type:"event",},{inputs:[],name:"acceptOwnership",outputs:[],stateMutability:"nonpayable",type:"function",},{inputs:[],name:"accessController",outputs:[{internalType:"contractAccessControllerInterface",name:"",type:"address",},],stateMutability:"view",type:"function",},{inputs:[],name:"aggregator",outputs:[{internalType:"address",name:"",type:"address",},],stateMutability:"view",type:"function",},{inputs:[{internalType:"address",name:"_aggregator",type:"address",},],name:"confirmAggregator",outputs:[],stateMutability:"nonpayable",type:"function",},{inputs:[],name:"decimals",outputs:[{internalType:"uint8",name:"",type:"uint8",},],stateMutability:"view",type:"function",},{inputs:[],name:"description",outputs:[{internalType:"string",name:"",type:"string",},],stateMutability:"view",type:"function",},{inputs:[{internalType:"uint256",name:"_roundId",type:"uint256",},],name:"getAnswer",outputs:[{internalType:"int256",name:"",type:"int256",},],stateMutability:"view",type:"function",},{inputs:[{internalType:"uint80",name:"_roundId",type:"uint80",},],name:"getRoundData",outputs:[{internalType:"uint80",name:"roundId",type:"uint80",},{internalType:"int256",name:"answer",type:"int256",},{internalType:"uint256",name:"startedAt",type:"uint256",},{internalType:"uint256",name:"updatedAt",type:"uint256",},{internalType:"uint80",name:"answeredInRound",type:"uint80",},],stateMutability:"view",type:"function",},{inputs:[{internalType:"uint256",name:"_roundId",type:"uint256",},],name:"getTimestamp",outputs:[{internalType:"uint256",name:"",type:"uint256",},],stateMutability:"view",type:"function",},{inputs:[],name:"latestAnswer",outputs:[{internalType:"int256",name:"",type:"int256",},],stateMutability:"view",type:"function",},{inputs:[],name:"latestRound",outputs:[{internalType:"uint256",name:"",type:"uint256",},],stateMutability:"view",type:"function",},{inputs:[],name:"latestRoundData",outputs:[{internalType:"uint80",name:"roundId",type:"uint80",},{internalType:"int256",name:"answer",type:"int256",},{internalType:"uint256",name:"startedAt",type:"uint256",},{internalType:"uint256",name:"updatedAt",type:"uint256",},{internalType:"uint80",name:"answeredInRound",type:"uint80",},],stateMutability:"view",type:"function",},{inputs:[],name:"latestTimestamp",outputs:[{internalType:"uint256",name:"",type:"uint256",},],stateMutability:"view",type:"function",},{inputs:[],name:"owner",outputs:[{internalType:"addresspayable",name:"",type:"address",},],stateMutability:"view",type:"function",},{inputs:[{internalType:"uint16",name:"",type:"uint16",},],name:"phaseAggregators",outputs:[{internalType:"contractAggregatorV2V3Interface",name:"",type:"address",},],stateMutability:"view",type:"function",},{inputs:[],name:"phaseId",outputs:[{internalType:"uint16",name:"",type:"uint16",},],stateMutability:"view",type:"function",},{inputs:[{internalType:"address",name:"_aggregator",type:"address",},],name:"proposeAggregator",outputs:[],stateMutability:"nonpayable",type:"function",},{inputs:[],name:"proposedAggregator",outputs:[{internalType:"contractAggregatorV2V3Interface",name:"",type:"address",},],stateMutability:"view",type:"function",},{inputs:[{internalType:"uint80",name:"_roundId",type:"uint80",},],name:"proposedGetRoundData",outputs:[{internalType:"uint80",name:"roundId",type:"uint80",},{internalType:"int256",name:"answer",type:"int256",},{internalType:"uint256",name:"startedAt",type:"uint256",},{internalType:"uint256",name:"updatedAt",type:"uint256",},{internalType:"uint80",name:"answeredInRound",type:"uint80",},],stateMutability:"view",type:"function",},{inputs:[],name:"proposedLatestRoundData",outputs:[{internalType:"uint80",name:"roundId",type:"uint80",},{internalType:"int256",name:"answer",type:"int256",},{internalType:"uint256",name:"startedAt",type:"uint256",},{internalType:"uint256",name:"updatedAt",type:"uint256",},{internalType:"uint80",name:"answeredInRound",type:"uint80",},],stateMutability:"view",type:"function",},{inputs:[{internalType:"address",name:"_accessController",type:"address",},],name:"setController",outputs:[],stateMutability:"nonpayable",type:"function",},{inputs:[{internalType:"address",name:"_to",type:"address",},],name:"transferOwnership",outputs:[],stateMutability:"nonpayable",type:"function",},{inputs:[],name:"version",outputs:[{internalType:"uint256",name:"",type:"uint256",},],stateMutability:"view",type:"function",},];
    return await new defaultWeb3Polygon.eth.Contract(abiOracle, oracleAddress[network][assetContract][0]);
}

async function getPrice(oracleContract) {
    let latestAnswer = oracleContract.methods.latestAnswer().call();
    let decimals = oracleContract.methods.decimals().call();
    return (await latestAnswer) / Math.pow(10, await decimals);
}

async function getVal(tippingAmount, tokenPrice, decimals) {
    return roundUp((tippingAmount / Math.pow(10, decimals)) * tokenPrice, 2);
}

function roundUp(num, precision) {
    precision = Math.pow(10, precision);
    return Math.ceil(num * precision) / precision;
}

async function calculateDollar(network_, assetAddr_, amount_) {
    let priceSt;
    if (oracleAddress[network_][assetAddr_][0]) {
        let oracle = await this.loadOracle(network_, assetAddr_); // token ticker selected
        priceSt = await this.getPrice(oracle);
    } else {
        let response = await (await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId[network_][assetAddr_][0]}&vs_currencies=USD`)).json();
        priceSt = Object.values(Object.values(response)[0])[0];
    }

    let decimals = oracleAddress[network_][assetAddr_][1];
    let val = this.getVal(amount_, priceSt, decimals);
    return val;
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
        polygonChainId = 80001
        rpcEndpoint = 'https://rpc-mumbai.maticvigil.com/'
        sendToAnyoneContractAddress = '0x0aD54889d059A8Df56A7b6eD8505834632889E97'
        idrissRegistryContractAddress = '0x6489A077e9D1382E87a493985C531bee2d484640'
        priceOracleContractAddress = '0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada'
        break;
    //mainnet
    case "production":
        loadPaymentMaticContractAddress = "0x066d3AE28E017Ac1E08FA857Ec68dfdC7de82a54"
        polygonChainId = 137
        rpcEndpoint = "https://rpc-mainnet.maticvigil.com/"
        sendToAnyoneContractAddress = '0xB1f313dbA7c470fF351e19625dcDCC442d3243C4'
        idrissRegistryContractAddress = '0x2eccb53ca2d4ef91a79213fddf3f8c2332c2a814'
        priceOracleContractAddress = '0xAB594600376Ec9fD91F8e885dADF0CE036862dE0'
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
        userHashForClaim = await idriss.getUserHash(walletType, identifier)
        console.log(`userhashForClaim = ${userHashForClaim}`)
        sendToAnyoneContract = await loadSendToAnyoneContract(window.web3)
        const currentBlockNumber = await window.web3.eth.getBlockNumber()
        const promises = []
        const events = []
        for (let i = currentBlockNumber; i > currentBlockNumber - 50000; i -= 1000) {
            const fromBlock = i - 1000
            const toBlock = i
            promises.push(
                sendToAnyoneContract.getPastEvents('AssetTransferred',{
                filter: {toHash: userHash},
                fromBlock: `${fromBlock}`,
                toBlock: `${toBlock}`
            }).then(e => {
                if (e.length > 0) {
                    for (const eKey of e) {
                        events.push(eKey)
                    }
                }
                })
            )
        }

        await Promise.all(promises)

        for (let i = 0; i < events.length; i++) {
            // defaultWeb3.utils.fromWei(events[0].returnValues.amount)
            let claimable = await sendToAnyoneContract.methods.balanceOf(events[i].returnValues.toHash, 0, events[i].returnValues.assetContractAddress).call();
            console.log(claimable)
            if (claimable>0) {
                hideNFTPath();
                dollarValue = await calculateDollar("polygon", events[i].returnValues.assetContractAddress, claimable)
                document.getElementById("welcomeMessage").innerHTML = "You received " + "$" + dollarValue + " in MATIC";
                document.getElementById("tipMessage").innerHTML = "Welcome to crypto!"
                paymentsToClaim.push({
                    amount: events[i].returnValues.amount,
                    assetContractAddress: events[i].returnValues.assetContractAddress,
                    from: events[i].returnValues.from,
                    toHash: events[i].returnValues.toHash
                })
            }
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
const Fortmatic = window.Fortmatic;

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
  chainId: polygonChainId
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

let customNetworkOptions = {
    rpcUrl: rpcEndpoint,
    chainId: 137
}

let providerOptionsFM = {
  fortmatic: {
    package: Fortmatic, // required
    options: {
      key: "pk_live_05E291BB168EC551", // required
      network: customNetworkOptions // if we don't pass it, it will default to localhost:8454
    }
  }
};

const providerOptions = {
    ...WalletConnectOpts,
    ...WalletLinkOpts,
    ...providerOptionsFM
}

if (deviceType() === "desktop") {
    Object.assign(providerOptions, MetaMaskOpts);
    Object.assign(providerOptions, TallyOpts);
}

async function init(providerInfo) {
    console.log(providerInfo)
    if (providerInfo == "fm") {
        // key for mainnet:
        // pk_live_05E291BB168EC551
        // pk_test_589EBE0E7D8CB015
        fm = new Fortmatic('pk_live_05E291BB168EC551', MATICOptions);
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

    document.getElementById("identifierInput").innerHTML = identifier;
    document.getElementById("identifierTemp").style.display = '';
    document.getElementById("DivStep3").style.display = '';
    document.getElementById("DivStep2").style.display = 'none';
    await signUp();
}

// should be triggered automatically based on identifier information.
// connect wallet first
async function signUp() {
    // identifier based on param in url
    identifierInput = identifier;
    contractRegistry = await idriss.idrissRegistryContractPromise
    let res;
    try {
    console.log(userHashForClaim)
        res = await contractRegistry.methods.getIDriss(userHashForClaim).call()
        console.log(res)
    } catch {
        console.log("User does not exist")
    }
    if (!res) {
        const result = await IdrissCrypto.Authorization.CreateOTP("Public ETH", identifierInput, selectedAccount)
        console.log(result.sessionKey)

        idHash = result.hash
        sessionKey = result.sessionKey
        document.getElementById("validateDiv").style.display = "";

        if (identifierInput.match(regT)) {
            twitterId = result.twitterId
            document.getElementById("accountName").innerHTML = identifier;
            showTwitterVerification(result.twitterMsg)
            console.log(result.twitterMsg)
        } else {
            document.getElementById("OTP").style.display = "";
        }
    } else {
        claim(paymentsToClaim[0].amount, 0, paymentsToClaim[0].assetContractAddress)
    }
}

// check if posted/OTP correct
async function validate() {
    console.log("validate called")
    let valid;
    // call validateOTP only once?
    if (document.getElementById("OTPInput").value) {
        try {
            valid = await IdrissCrypto.Authorization.ValidateOTP(document.getElementById("OTPInput").value, sessionKey);
        } catch {
            document.getElementById("noTwitter-error").style.display = "block";
        }
    } else {
        valid = await IdrissCrypto.Authorization.ValidateOTP("0", sessionKey);
    }
    paymentContract = await loadPaymentMATIC(web3);
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
    checkedPayment = await IdrissCrypto.Authorization.CheckPayment("MATIC", sessionKey);
    console.log("Success")
    //TODO: add support for tokens and nfts
    await claim(paymentsToClaim[0].amount, 0, paymentsToClaim[0].assetContractAddress)
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

    await fetch('https://gasstation-mainnet.matic.network/v2')
        .then(response => response.json())
        .then(json => gas = String(Math.round(json['fast']['maxFee']*1000000000)))
    console.log({userHash, identifier, walletType, asset, gas})
    //TODO: start waiting animation
    let result
    await idriss.claim(identifier, claimPassword, walletType, asset, {gasPrice: gas })
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

function hideNFTPath() {
    document.getElementById("DivStep2").style.display = "none";
    document.getElementById("DivStep3").style.display = "none";
    document.getElementById("DivStep4").style.display = "none";
    document.getElementById("DivStep1").style.display = "";
    document.getElementById("DivClaimToken").style.display = "";
    document.getElementById("DivClaimNFT").style.display = "none";
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