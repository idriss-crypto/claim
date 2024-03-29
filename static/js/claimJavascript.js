const Web3Modal = window.Web3Modal.default;
let provider = null;

let identifier;
let claimPassword;
let assetId;
let assetType;
let assetAddress;
let token;
let blockNumber;
let idriss;
let userHash;
let userHashForClaim;
let rpcEndpoint;
let polygonChainId;
let loadPaymentMaticContractAddress;
let sendToAnyoneContractAddress;
let idrissRegistryContractAddress;
let priceOracleContractAddress;
let sendToAnyoneContract;
const ENV = "production";
let validateApiName = ENV === "production" ? "Authorization" : "AuthorizationTestnet";
let paymentsToClaim = [];
let defaultWeb3Polygon;

ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

const walletType = {
    coin: "ETH",
    network: "evm",
    walletTag: "Public ETH",
};
const assetTypes = {};
assetTypes["native"] = 0;
assetTypes["erc20"] = 1;
assetTypes["erc721"] = 2;
assetTypes["erc1155"] = 3;
// use universal token list and api fo pricing in the future
let oracleAddress;
if (ENV === "production") {
    oracleAddress = {
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
} else if (ENV === "development") {
    oracleAddress = {
        polygon: {
            "0x0000000000000000000000000000000000000000": ["0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada", 18], // MATIC Polygon
            "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619": ["0x0715A7794a1dc8e42615F059dD6e406A6594651A", 18], // WETH Polygon
            "0x2791bca1f2de4661ed88a30c99a7a9449aa84174": ["0x572dDec9087154dC5dfBB1546Bb62713147e0Ab0", 6], // USDC Polygon
            "0xc2132d05d31c914a87c6611c10748aeb04b58e8f": ["0x92C09849638959196E976289418e5973CC96d645", 6], // USDT Polygon
            "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063": ["0x0FCAa9c899EC5A91eBc3D5Dd869De833b06fB046", 18], // DAI Polygon
        },
    };
} else {
    oracleAddress = {
        polygon: {}, // empty, to get data from API
    };
}

// add ids of token not supported in chainlink oracles

let coingeckoId;
if (ENV === "production") {
    coingeckoId = {
        ethereum: {
            "0xf0f9d895aca5c8678f706fb8216fa22957685a13": ["cult-dao", 18], // CULT ETH
        },
        polygon: {
            "0xf0f9D895aCa5c8678f706FB8216fa22957685A13": ["revolt-2-earn", 18], // RVLT Polygon
        },
    };
} else {
    coingeckoId = {
        ethereum: {
            "0xf0f9d895aca5c8678f706fb8216fa22957685a13": ["cult-dao", 18], // CULT ETH
        },
        polygon: {
            "0xdb54fa574a3e8c6aC784e1a5cdB575A737622CFf": ["WMATIC", 18], // local tests
            "0x0000000000000000000000000000000000000000": ["WMATIC", 18], // local tests
        },
    };
}

async function loadOracle(network, assetContract) {
    let abiOracle = [
        {
            inputs: [
                { internalType: "address", name: "_aggregator", type: "address" },
                { internalType: "address", name: "_accessController", type: "address" },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "int256", name: "current", type: "int256" },
                { indexed: true, internalType: "uint256", name: "roundId", type: "uint256" },
                { indexed: false, internalType: "uint256", name: "updatedAt", type: "uint256" },
            ],
            name: "AnswerUpdated",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "uint256", name: "roundId", type: "uint256" },
                { indexed: true, internalType: "address", name: "startedBy", type: "address" },
                { indexed: false, internalType: "uint256", name: "startedAt", type: "uint256" },
            ],
            name: "NewRound",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "from", type: "address" },
                { indexed: true, internalType: "address", name: "to", type: "address" },
            ],
            name: "OwnershipTransferRequested",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: "address", name: "from", type: "address" },
                { indexed: true, internalType: "address", name: "to", type: "address" },
            ],
            name: "OwnershipTransferred",
            type: "event",
        },
        { inputs: [], name: "acceptOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
        { inputs: [], name: "accessController", outputs: [{ internalType: "contractAccessControllerInterface", name: "", type: "address" }], stateMutability: "view", type: "function" },
        { inputs: [], name: "aggregator", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
        { inputs: [{ internalType: "address", name: "_aggregator", type: "address" }], name: "confirmAggregator", outputs: [], stateMutability: "nonpayable", type: "function" },
        { inputs: [], name: "decimals", outputs: [{ internalType: "uint8", name: "", type: "uint8" }], stateMutability: "view", type: "function" },
        { inputs: [], name: "description", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
        { inputs: [{ internalType: "uint256", name: "_roundId", type: "uint256" }], name: "getAnswer", outputs: [{ internalType: "int256", name: "", type: "int256" }], stateMutability: "view", type: "function" },
        {
            inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
            name: "getRoundData",
            outputs: [
                { internalType: "uint80", name: "roundId", type: "uint80" },
                { internalType: "int256", name: "answer", type: "int256" },
                { internalType: "uint256", name: "startedAt", type: "uint256" },
                { internalType: "uint256", name: "updatedAt", type: "uint256" },
                { internalType: "uint80", name: "answeredInRound", type: "uint80" },
            ],
            stateMutability: "view",
            type: "function",
        },
        { inputs: [{ internalType: "uint256", name: "_roundId", type: "uint256" }], name: "getTimestamp", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
        { inputs: [], name: "latestAnswer", outputs: [{ internalType: "int256", name: "", type: "int256" }], stateMutability: "view", type: "function" },
        { inputs: [], name: "latestRound", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
        {
            inputs: [],
            name: "latestRoundData",
            outputs: [
                { internalType: "uint80", name: "roundId", type: "uint80" },
                { internalType: "int256", name: "answer", type: "int256" },
                { internalType: "uint256", name: "startedAt", type: "uint256" },
                { internalType: "uint256", name: "updatedAt", type: "uint256" },
                { internalType: "uint80", name: "answeredInRound", type: "uint80" },
            ],
            stateMutability: "view",
            type: "function",
        },
        { inputs: [], name: "latestTimestamp", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
        { inputs: [], name: "owner", outputs: [{ internalType: "addresspayable", name: "", type: "address" }], stateMutability: "view", type: "function" },
        { inputs: [{ internalType: "uint16", name: "", type: "uint16" }], name: "phaseAggregators", outputs: [{ internalType: "contractAggregatorV2V3Interface", name: "", type: "address" }], stateMutability: "view", type: "function" },
        { inputs: [], name: "phaseId", outputs: [{ internalType: "uint16", name: "", type: "uint16" }], stateMutability: "view", type: "function" },
        { inputs: [{ internalType: "address", name: "_aggregator", type: "address" }], name: "proposeAggregator", outputs: [], stateMutability: "nonpayable", type: "function" },
        { inputs: [], name: "proposedAggregator", outputs: [{ internalType: "contractAggregatorV2V3Interface", name: "", type: "address" }], stateMutability: "view", type: "function" },
        {
            inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
            name: "proposedGetRoundData",
            outputs: [
                { internalType: "uint80", name: "roundId", type: "uint80" },
                { internalType: "int256", name: "answer", type: "int256" },
                { internalType: "uint256", name: "startedAt", type: "uint256" },
                { internalType: "uint256", name: "updatedAt", type: "uint256" },
                { internalType: "uint80", name: "answeredInRound", type: "uint80" },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "proposedLatestRoundData",
            outputs: [
                { internalType: "uint80", name: "roundId", type: "uint80" },
                { internalType: "int256", name: "answer", type: "int256" },
                { internalType: "uint256", name: "startedAt", type: "uint256" },
                { internalType: "uint256", name: "updatedAt", type: "uint256" },
                { internalType: "uint80", name: "answeredInRound", type: "uint80" },
            ],
            stateMutability: "view",
            type: "function",
        },
        { inputs: [{ internalType: "address", name: "_accessController", type: "address" }], name: "setController", outputs: [], stateMutability: "nonpayable", type: "function" },
        { inputs: [{ internalType: "address", name: "_to", type: "address" }], name: "transferOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
        { inputs: [], name: "version", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
    ];
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
    let decimals;
    if (oracleAddress[network_] && oracleAddress[network_][assetAddr_]) {
        let oracle = await this.loadOracle(network_, assetAddr_); // token ticker selected
        priceSt = await this.getPrice(oracle);
        decimals = oracleAddress[network_][assetAddr_][1];
    } else {
        let response = await (await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId[network_][assetAddr_][0]}&vs_currencies=USD`)).json();
        priceSt = Object.values(Object.values(response)[0])[0];
        decimals = coingeckoId[network_][assetAddr_][1];
    }

    let val = this.getVal(amount_, priceSt, decimals);
    return val;
}

switch (ENV) {
    // local hardhat
    case "local":
        loadPaymentMaticContractAddress = "0x2EcCb53ca2d4ef91A79213FDDF3f8c2332c2a814";
        polygonChainId = 1337;
        rpcEndpoint = "http://localhost:8545";
        sendToAnyoneContractAddress = "0x9f62EE65a8395824Ee0821eF2Dc4C947a23F0f25";
        idrissRegistryContractAddress = "0xA3307BF348ACC4bEDdd67CCA2f7F0c4349d347Db";
        priceOracleContractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
        rpcEndpointPolygon = "http://localhost:8545";
        break;
    //Mumbai
    case "development":
        loadPaymentMaticContractAddress = "0x2EcCb53ca2d4ef91A79213FDDF3f8c2332c2a814";
        polygonChainId = 80001;
        rpcEndpoint = "https://rpc-mumbai.maticvigil.com/";
        rpcEndpointPolygon = "https://rpc-mumbai.maticvigil.com/";
        sendToAnyoneContractAddress = "0x9f62EE65a8395824Ee0821eF2Dc4C947a23F0f25";
        idrissRegistryContractAddress = "0x6489A077e9D1382E87a493985C531bee2d484640";
        priceOracleContractAddress = "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada";
        break;
    //mainnet
    case "production":
        loadPaymentMaticContractAddress = "0x066d3AE28E017Ac1E08FA857Ec68dfdC7de82a54";
        polygonChainId = 137;
        rpcEndpoint = "https://polygon-rpc.com/";
        rpcEndpointPolygon = "https://polygon-rpc.com/";
        sendToAnyoneContractAddress = "0xf333EDE8D49dD100F02c946809C9F5D9867D10C0";
        idrissRegistryContractAddress = "0x2eccb53ca2d4ef91a79213fddf3f8c2332c2a814";
        priceOracleContractAddress = "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0";
        break;
}

pubETHTag = "9306eda974cb89b82c0f38ab407f55b6d124159d1fa7779f2e088b2b786573c1";

const regPh = /^(\+\(?\d{1,4}\s?)\)?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;
const regM = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const regT = /^@[a-zA-Z0-9_]{1,15}$/;

// set default web3 + provider for frontend checks w/o connecting wallet
let defaultWeb3;

document.addEventListener("DOMContentLoaded", async () => {

    try {
        let provider = new Web3.providers.HttpProvider(rpcEndpoint);
        defaultWeb3 = new Web3(provider);
        defaultWeb3Polygon = new Web3(new Web3.providers.HttpProvider(rpcEndpointPolygon));
        let params = new URL(document.location).searchParams;
        identifier = params.get("identifier").replace(" ", "+");
        claimPassword = params.get("claimPassword");
        assetId = params.get("assetId") ?? 0;
        if (assetId == 'null') assetId = 0;
        assetType = assetTypes[params.get("assetType")];
        assetAddress = params.get("assetAddress");
        token = params.get("token");
        blockNumber = parseInt(params.get("blockNumber"));
        let regxP = /^(\+\(?\d{1,4}\s?)\)?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        let regxT = /^@[a-zA-Z0-9_]{1,15}$/;

        if (regxP.test(identifier)) {
            document.getElementById('identifier').innerHTML = "Phone Number"
        } else if (regxT.test(identifier)) {
            document.getElementById('identifier').innerHTML = "Twitter Username"
        } else {
            document.getElementById('identifier').innerHTML = "Email"
        }

        console.log({ identifier, claimPassword });
        idriss = new IdrissCrypto.IdrissCrypto(rpcEndpoint, {
            web3Provider: provider,
            sendToAnyoneContractAddress,
            idrissRegistryContractAddress,
            priceOracleContractAddress,
        });
        const walletType = {
            network: "evm",
            coin: "ETH",
            walletTag: "Public ETH",
        };

        window.web3 = defaultWeb3Polygon;

        if (identifier && claimPassword) {
            userHash = await idriss.getHashForIdentifier(identifier, walletType, claimPassword);
            console.log(`userhash = ${userHash}`);
            userHashForClaim = await idriss.getUserHash(walletType, identifier);
            console.log(`userhashForClaim = ${userHashForClaim}`);
            sendToAnyoneContract = await loadSendToAnyoneContract(window.web3);
            const promises = [];
            const events = [];
            // use blocknumber as defined above
            // fromBlock: blockNumber - 1
            // toBlock: blockNumber + 1
            promises.push(
                sendToAnyoneContract
                    .getPastEvents("AssetTransferred", {
                        filter: { toHash: userHash },
                        fromBlock: blockNumber - 1,
                        toBlock: blockNumber + 1,
                    }).then((e) => {
                        if (e.length > 0) {
                            for (const eKey of e) {
                                console.log(eKey);
                                events.push(eKey);
                            }
                        }
                    })
            );


            await Promise.all(promises);

            for (let i = 0; i < events.length; i++) {
                // delete message and assetType => add when smart contract is updated
                const {toHash, assetType, assetContractAddress, amount, from, message} = events[i].returnValues;
                // defaultWeb3.utils.fromWei(events[0].returnValues.amount)
                // assetType is defined on page load
                console.log("getting claim with ", toHash, assetType, assetContractAddress, assetId)
                let claimable = await sendToAnyoneContract.methods.balanceOf(toHash, assetType, assetContractAddress, assetId).call();
                console.log(claimable);
                if (claimable > 0) {
                    let claimMessageMain;
                    let claimMessageSubtitle = "Welcome to Crypto!";
                    if (message) claimMessageSubtitle = message;
                    document.getElementById("tipMessageWrapper").style.display = message? "block": "none";
                    if (assetType == 0) {
                        dollarValue = await calculateDollar("polygon", assetContractAddress, claimable);
                        hideNFTPath();
                        document.getElementById("DivClaimToken").style.display = "";
                        claimMessageMain = "You have received " + "$" + dollarValue + " in MATIC";
                        document.getElementById("welcomeMessageToken").innerHTML = claimMessageMain;
                        document.getElementById("tipMessageToken").innerHTML = claimMessageSubtitle;
                    } else if (assetType == 1) {
                        hideNFTPath();
                        document.getElementById("DivClaimToken").style.display = "";
                        dollarValue = await calculateDollar("polygon", assetContractAddress, claimable);
                        const tokenContract = await loadERC20Contract(window.web3, assetContractAddress);
                        const symbol = await tokenContract.methods.symbol().call();
                        claimMessageMain = `You have received $${dollarValue} in ${symbol}`;
                        document.getElementById("welcomeMessageToken").innerHTML = claimMessageMain;
                        document.getElementById("tipMessageToken").innerHTML = claimMessageSubtitle;
                    } else {
                        // or use ierc721 to fetch token uri
                        const ierc721 = await loadERC721Contract(defaultWeb3Polygon, assetContractAddress);
                        let tokenURI = await ierc721.methods.tokenURI(assetId).call();
                        tokenURI = translateImageSRC(tokenURI);
                        console.log(tokenURI);
                        await fetch(tokenURI)
                            .then((response) => response.json())
                            .then((json) => {
                                claimNFTMain = `${json.name}`;
                                document.getElementById("nftId").src = translateImageSRC(json.image);
                                document.getElementById("nftIdDone").src = translateImageSRC(json.image);
                            });
                        document.getElementById("nftName").innerHTML = claimNFTMain;
                        document.getElementById("nftNameDone").innerHTML = claimNFTMain;
                        document.getElementById("tipMessageNFT").innerHTML = claimMessageSubtitle;
                        let openseaLink = "https://opensea.io/assets/matic/" + assetContractAddress + "/" + assetId;
                        document.getElementById("openseaLink").href = openseaLink;
                        document.getElementById("openseaLinkDone").href = openseaLink;
                        document.getElementById("DivClaimNFT").style.display = "";
                    }

                    paymentsToClaim.push({
                        amount,
                        assetContractAddress,
                        from,
                        assetType,
                        toHash,
                    });

                    document.getElementById("DivStep0").style.display = "none";
                    document.getElementById("DivStep1").style.display = "";

                } else {
                    document.getElementById("spinnerSearch").style.display = "none";
                    document.getElementById("searchRes").innerHTML = "There are no assets to claim";
                    document.getElementById("searchResCTA").style.display = "";
                }
            } if (events.length == 0) {
                document.getElementById("spinnerSearch").style.display = "none";
                document.getElementById("searchRes").innerHTML = "There are no assets to claim";
                document.getElementById("searchResCTA").style.display = "";
            }
            console.log(events);
            console.log(paymentsToClaim);
        }
    } catch(e){
        console.log(e)
        document.getElementById("spinnerSearch").style.display = "none";
        document.getElementById("searchRes").innerHTML = "There are no assets to claim";
        document.getElementById("searchResCTA").style.display = "";
    }
});


function translateImageSRC(_uri) {
    if (_uri.startsWith("http")) return _uri;
    return _uri.replace("ipfs://", "https://ipfs.io/ipfs/");
}

async function loadERC1155Contract(web3_, contractAddress_) {
    return await new web3_.eth.Contract( [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "values",
				"type": "uint256[]"
			}
		],
		"name": "TransferBatch",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "TransferSingle",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "value",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "URI",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "accounts",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			}
		],
		"name": "balanceOfBatch",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeBatchTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "uri",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
], contractAddress_ );
}

async function loadERC721Contract(web3_, contractAddress_) {
    return await new web3_.eth.Contract(
        [
            {
                inputs: [
                    { internalType: "string", name: "name_", type: "string" },
                    { internalType: "string", name: "symbol_", type: "string" },
                ],
                stateMutability: "nonpayable",
                type: "constructor",
            },
            {
                anonymous: false,
                inputs: [
                    { indexed: true, internalType: "address", name: "owner", type: "address" },
                    { indexed: true, internalType: "address", name: "approved", type: "address" },
                    { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
                ],
                name: "Approval",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    { indexed: true, internalType: "address", name: "owner", type: "address" },
                    { indexed: true, internalType: "address", name: "operator", type: "address" },
                    { indexed: false, internalType: "bool", name: "approved", type: "bool" },
                ],
                name: "ApprovalForAll",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    { indexed: true, internalType: "address", name: "from", type: "address" },
                    { indexed: true, internalType: "address", name: "to", type: "address" },
                    { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
                ],
                name: "Transfer",
                type: "event",
            },
            {
                inputs: [
                    { internalType: "address", name: "to", type: "address" },
                    { internalType: "uint256", name: "tokenId", type: "uint256" },
                ],
                name: "approve",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            { inputs: [{ internalType: "address", name: "owner", type: "address" }], name: "balanceOf", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
            { inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }], name: "getApproved", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
            {
                inputs: [
                    { internalType: "address", name: "owner", type: "address" },
                    { internalType: "address", name: "operator", type: "address" },
                ],
                name: "isApprovedForAll",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "view",
                type: "function",
            },
            { inputs: [], name: "name", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
            { inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }], name: "ownerOf", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
            {
                inputs: [
                    { internalType: "address", name: "from", type: "address" },
                    { internalType: "address", name: "to", type: "address" },
                    { internalType: "uint256", name: "tokenId", type: "uint256" },
                ],
                name: "safeTransferFrom",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "from", type: "address" },
                    { internalType: "address", name: "to", type: "address" },
                    { internalType: "uint256", name: "tokenId", type: "uint256" },
                    { internalType: "bytes", name: "data", type: "bytes" },
                ],
                name: "safeTransferFrom",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "operator", type: "address" },
                    { internalType: "bool", name: "approved", type: "bool" },
                ],
                name: "setApprovalForAll",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            { inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }], name: "supportsInterface", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "view", type: "function" },
            { inputs: [], name: "symbol", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
            { inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }], name: "tokenURI", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
            {
                inputs: [
                    { internalType: "address", name: "from", type: "address" },
                    { internalType: "address", name: "to", type: "address" },
                    { internalType: "uint256", name: "tokenId", type: "uint256" },
                ],
                name: "transferFrom",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
        ],
        contractAddress_
    );
}

async function loadERC20Contract(web3_, contractAddress_) {
    return await new web3_.eth.Contract(
        [
            {
                inputs: [
                    { internalType: "string", name: "name_", type: "string" },
                    { internalType: "string", name: "symbol_", type: "string" },
                ],
                stateMutability: "nonpayable",
                type: "constructor",
            },
            {
                anonymous: false,
                inputs: [
                    { indexed: true, internalType: "address", name: "owner", type: "address" },
                    { indexed: true, internalType: "address", name: "spender", type: "address" },
                    { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
                ],
                name: "Approval",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    { indexed: true, internalType: "address", name: "from", type: "address" },
                    { indexed: true, internalType: "address", name: "to", type: "address" },
                    { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
                ],
                name: "Transfer",
                type: "event",
            },
            {
                inputs: [
                    { internalType: "address", name: "owner", type: "address" },
                    { internalType: "address", name: "spender", type: "address" },
                ],
                name: "allowance",
                outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "spender", type: "address" },
                    { internalType: "uint256", name: "amount", type: "uint256" },
                ],
                name: "approve",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "nonpayable",
                type: "function",
            },
            { inputs: [{ internalType: "address", name: "account", type: "address" }], name: "balanceOf", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
            { inputs: [], name: "decimals", outputs: [{ internalType: "uint8", name: "", type: "uint8" }], stateMutability: "view", type: "function" },
            {
                inputs: [
                    { internalType: "address", name: "spender", type: "address" },
                    { internalType: "uint256", name: "subtractedValue", type: "uint256" },
                ],
                name: "decreaseAllowance",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "spender", type: "address" },
                    { internalType: "uint256", name: "addedValue", type: "uint256" },
                ],
                name: "increaseAllowance",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "nonpayable",
                type: "function",
            },
            { inputs: [], name: "name", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
            { inputs: [], name: "symbol", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
            { inputs: [], name: "totalSupply", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
            {
                inputs: [
                    { internalType: "address", name: "to", type: "address" },
                    { internalType: "uint256", name: "amount", type: "uint256" },
                ],
                name: "transfer",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "from", type: "address" },
                    { internalType: "address", name: "to", type: "address" },
                    { internalType: "uint256", name: "amount", type: "uint256" },
                ],
                name: "transferFrom",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "nonpayable",
                type: "function",
            },
        ],
        contractAddress_
    );
}

async function loadPaymentMATIC(web3_) {
    return await new web3_.eth.Contract(
        [
            { inputs: [], stateMutability: "nonpayable", type: "constructor" },
            { anonymous: false, inputs: [{ indexed: true, internalType: "address", name: "admin", type: "address" }], name: "AdminAdded", type: "event" },
            { anonymous: false, inputs: [{ indexed: true, internalType: "address", name: "admin", type: "address" }], name: "AdminDeleted", type: "event" },
            {
                anonymous: false,
                inputs: [
                    { indexed: false, internalType: "string", name: "delegateHandle", type: "string" },
                    { indexed: true, internalType: "address", name: "delegateAddress", type: "address" },
                ],
                name: "DelegateAdded",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    { indexed: false, internalType: "string", name: "delegateHandle", type: "string" },
                    { indexed: true, internalType: "address", name: "delegateAddress", type: "address" },
                ],
                name: "DelegateDeleted",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
                    { indexed: true, internalType: "address", name: "newOwner", type: "address" },
                ],
                name: "OwnershipTransferred",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    { indexed: true, internalType: "address", name: "payer", type: "address" },
                    { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
                    { indexed: false, internalType: "bytes32", name: "paymentId_hash", type: "bytes32" },
                    { indexed: true, internalType: "string", name: "IDrissHash", type: "string" },
                    { indexed: false, internalType: "uint256", name: "date", type: "uint256" },
                ],
                name: "PaymentDone",
                type: "event",
            },
            { inputs: [{ internalType: "string", name: "", type: "string" }], name: "IDrissHashes", outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }], stateMutability: "view", type: "function" },
            { inputs: [{ internalType: "address", name: "adminAddress", type: "address" }], name: "addAdmin", outputs: [], stateMutability: "nonpayable", type: "function" },
            {
                inputs: [
                    { internalType: "address", name: "delegateAddress", type: "address" },
                    { internalType: "string", name: "delegateHandle", type: "string" },
                ],
                name: "addDelegate",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "delegateAddress", type: "address" },
                    { internalType: "string", name: "delegateHandle", type: "string" },
                    { internalType: "uint256", name: "percentage", type: "uint256" },
                ],
                name: "addDelegateException",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            { inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }], name: "amounts", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
            { inputs: [{ internalType: "address", name: "", type: "address" }], name: "balanceOf", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
            { inputs: [], name: "contractOwner", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
            { inputs: [{ internalType: "string", name: "", type: "string" }], name: "delegate", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
            { inputs: [{ internalType: "address", name: "adminAddress", type: "address" }], name: "deleteAdmin", outputs: [], stateMutability: "nonpayable", type: "function" },
            { inputs: [{ internalType: "string", name: "delegateHandle", type: "string" }], name: "deleteDelegate", outputs: [], stateMutability: "nonpayable", type: "function" },
            {
                inputs: [
                    { internalType: "string", name: "receiptId", type: "string" },
                    { internalType: "address", name: "paymAddr", type: "address" },
                ],
                name: "hashReceipt",
                outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
                stateMutability: "pure",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "bytes32", name: "paymentId_hash", type: "bytes32" },
                    { internalType: "string", name: "IDrissHash", type: "string" },
                    { internalType: "string", name: "delegateHandle", type: "string" },
                ],
                name: "payNative",
                outputs: [],
                stateMutability: "payable",
                type: "function",
            },
            { inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }], name: "receipts", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
            { inputs: [{ internalType: "address", name: "newOwner", type: "address" }], name: "transferContractOwnership", outputs: [], stateMutability: "payable", type: "function" },
            {
                inputs: [
                    { internalType: "string", name: "receiptId", type: "string" },
                    { internalType: "address", name: "paymAddr", type: "address" },
                ],
                name: "verifyReceipt",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "uint256", name: "amount", type: "uint256" },
                    { internalType: "string", name: "delegateHandle", type: "string" },
                ],
                name: "withdraw",
                outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
                stateMutability: "nonpayable",
                type: "function",
            },
        ],
        loadPaymentMaticContractAddress
    );
}

async function loadSendToAnyoneContract(web3_) {
    return await new web3_.eth.Contract(
        [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_IDrissAddr",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_maticUsdAggregator",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "innerError",
				"type": "bytes"
			}
		],
		"name": "BatchError",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "toHash",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "beneficiary",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "assetContractAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum AssetType",
				"name": "assetType",
				"type": "uint8"
			}
		],
		"name": "AssetClaimed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "fromHash",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "toHash",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "assetContractAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum AssetType",
				"name": "assetType",
				"type": "uint8"
			}
		],
		"name": "AssetMoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "toHash",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "assetContractAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum AssetType",
				"name": "assetType",
				"type": "uint8"
			}
		],
		"name": "AssetTransferReverted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "toHash",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "assetContractAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum AssetType",
				"name": "assetType",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"name": "AssetTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "IDRISS_ADDR",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MINIMAL_PAYMENT_FEE",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MINIMAL_PAYMENT_FEE_DENOMINATOR",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "PAYMENT_FEE_PERCENTAGE",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "PAYMENT_FEE_PERCENTAGE_DENOMINATOR",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "PAYMENT_FEE_SLIPPAGE_PERCENT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_IDrissHash",
				"type": "bytes32"
			},
			{
				"internalType": "enum AssetType",
				"name": "_assetType",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "_assetContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_assetId",
				"type": "uint256"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes[]",
				"name": "calls",
				"type": "bytes[]"
			}
		],
		"name": "batch",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_minimalPaymentFee",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_paymentFeeDenominator",
				"type": "uint256"
			}
		],
		"name": "changeMinimalPaymentFee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_paymentFeePercentage",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_paymentFeeDenominator",
				"type": "uint256"
			}
		],
		"name": "changePaymentFeePercentage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_IDrissHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_claimPassword",
				"type": "string"
			},
			{
				"internalType": "enum AssetType",
				"name": "_assetType",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "_assetContractAddress",
				"type": "address"
			}
		],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimPaymentFees",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			},
			{
				"internalType": "enum AssetType",
				"name": "_assetType",
				"type": "uint8"
			}
		],
		"name": "getPaymentFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_IDrissHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_claimPassword",
				"type": "string"
			}
		],
		"name": "hashIDrissWithPassword",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_FromIDrissHash",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "_ToIDrissHash",
				"type": "bytes32"
			},
			{
				"internalType": "enum AssetType",
				"name": "_assetType",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "_assetContractAddress",
				"type": "address"
			}
		],
		"name": "moveAssetToOtherHash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC1155BatchReceived",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC1155Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC721Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paymentFeesBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_IDrissHash",
				"type": "bytes32"
			},
			{
				"internalType": "enum AssetType",
				"name": "_assetType",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "_assetContractAddress",
				"type": "address"
			}
		],
		"name": "revertPayment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_IDrissHash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "enum AssetType",
				"name": "_assetType",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "_assetContractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_assetId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "sendToAnyone",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
],
        sendToAnyoneContractAddress
    );
}

function lowerFirst(string_) {
    return string_.charAt(0).toLowerCase() + string_.slice(1);
}

function convertPhone(string_) {
    // allow for letters because secret word can follow phone number
    return "+" + string_.replace(/[^\da-zA-Z]/, "");
}

async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // convert bytes to hex string
    return hashHex;
}

//NAV BAR
//Connecting wallet
function isTallyInstalled() {
    let providers = window.ethereum.providers;
    let pTally;
    if (providers) {
        pTally = providers.find((p) => p.isTally);
    }
    if (pTally) {
        return true;
    } else {
        return false;
    }
}
let TallyOpts = {
    "custom-tally": {
        display: {
            logo: "../static/images/tally.svg",
            name: "Taho",
            description: "Connect to your Taho Wallet",
        },
        package: true,
        connector: async () => {
            if (!isTallyInstalled()) {
                window.open("https://taho.xyz/", "_blank"); // <-- LOOK HERE
                return;
            }
            let provider = null;
            if (typeof window.ethereum !== "undefined") {
                let providers = window.ethereum.providers;
                if (providers) {
                    provider = providers.find((p) => p.isTally);
                } else {
                    provider = window.ethereum;
                }
                try {
                    await provider.request({ method: "eth_requestAccounts" });
                } catch (error) {
                    throw new Error("User Rejected");
                }
            } else {
                throw new Error("No Taho Wallet found");
            }
            console.log("Tally provider", provider);
            return provider;
        },
    },
};

// web3 for chosen wallet
let web3;

// Address of the selected account
let account;
let selectedAccount;
let idHash;
let paid;
let zerionLink;

// Load our smart contract
async function loadContract() {
    return await new defaultWeb3.eth.Contract(
        [
            { anonymous: false, inputs: [{ indexed: true, internalType: "address", name: "admin", type: "address" }], name: "AdminAdded", type: "event" },
            { anonymous: false, inputs: [{ indexed: true, internalType: "address", name: "admin", type: "address" }], name: "AdminDeleted", type: "event" },
            { anonymous: false, inputs: [{ indexed: false, internalType: "uint256", name: "value", type: "uint256" }], name: "Decrement", type: "event" },
            { anonymous: false, inputs: [{ indexed: true, internalType: "string", name: "hash", type: "string" }], name: "IDrissAdded", type: "event" },
            { anonymous: false, inputs: [{ indexed: true, internalType: "string", name: "hash", type: "string" }], name: "IDrissDeleted", type: "event" },
            {
                anonymous: false,
                inputs: [
                    { indexed: true, internalType: "address", name: "previousIDrissOwner", type: "address" },
                    { indexed: true, internalType: "address", name: "newIDrissOwner", type: "address" },
                ],
                name: "IDrissOwnershipTransferred",
                type: "event",
            },
            { anonymous: false, inputs: [{ indexed: false, internalType: "uint256", name: "value", type: "uint256" }], name: "Increment", type: "event" },
            { anonymous: false, inputs: [{ indexed: false, internalType: "uint256", name: "price", type: "uint256" }], name: "NewPrice", type: "event" },
            {
                anonymous: false,
                inputs: [
                    { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
                    { indexed: true, internalType: "address", name: "newOwner", type: "address" },
                ],
                name: "OwnershipTransferred",
                type: "event",
            },
            { inputs: [{ internalType: "string", name: "", type: "string" }], name: "IDrissOwners", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
            { inputs: [{ internalType: "address", name: "adminAddress", type: "address" }], name: "addAdmin", outputs: [], stateMutability: "nonpayable", type: "function" },
            {
                inputs: [
                    { internalType: "string", name: "hashPub", type: "string" },
                    { internalType: "string", name: "hashID", type: "string" },
                    { internalType: "string", name: "address_", type: "string" },
                    { internalType: "address", name: "ownerAddress", type: "address" },
                ],
                name: "addIDriss",
                outputs: [],
                stateMutability: "payable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "string", name: "hashPub", type: "string" },
                    { internalType: "string", name: "hashID", type: "string" },
                    { internalType: "string", name: "address_", type: "string" },
                    { internalType: "address", name: "token", type: "address" },
                    { internalType: "uint256", name: "amount", type: "uint256" },
                    { internalType: "address", name: "ownerAddress", type: "address" },
                ],
                name: "addIDrissToken",
                outputs: [],
                stateMutability: "payable",
                type: "function",
            },
            { inputs: [], name: "contractOwner", outputs: [{ internalType: "address", name: "", type: "address" }], stateMutability: "view", type: "function" },
            { inputs: [], name: "countAdding", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
            { inputs: [], name: "countDeleting", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
            { inputs: [], name: "creationTime", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
            { inputs: [{ internalType: "address", name: "adminAddress", type: "address" }], name: "deleteAdmin", outputs: [], stateMutability: "nonpayable", type: "function" },
            { inputs: [{ internalType: "string", name: "hashPub", type: "string" }], name: "deleteIDriss", outputs: [], stateMutability: "payable", type: "function" },
            { inputs: [{ internalType: "string", name: "hashPub", type: "string" }], name: "getIDriss", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
            { inputs: [{ internalType: "string", name: "", type: "string" }], name: "payDates", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
            { inputs: [], name: "price", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
            { inputs: [{ internalType: "uint256", name: "newPrice", type: "uint256" }], name: "setPrice", outputs: [], stateMutability: "nonpayable", type: "function" },
            { inputs: [{ internalType: "address", name: "newOwner", type: "address" }], name: "transferContractOwnership", outputs: [], stateMutability: "payable", type: "function" },
            {
                inputs: [
                    { internalType: "string", name: "hashPub", type: "string" },
                    { internalType: "address", name: "newOwner", type: "address" },
                ],
                name: "transferIDrissOwnership",
                outputs: [],
                stateMutability: "payable",
                type: "function",
            },
            { inputs: [], name: "withdraw", outputs: [{ internalType: "bytes", name: "", type: "bytes" }], stateMutability: "nonpayable", type: "function" },
            { inputs: [{ internalType: "address", name: "tokenContract", type: "address" }], name: "withdrawTokens", outputs: [], stateMutability: "nonpayable", type: "function" },
        ],
        "0x2EcCb53ca2d4ef91A79213FDDF3f8c2332c2a814"
    );
}

// Contract to interact with for payment
let contract;
let GAS_LIMIT_PAY_NATIVE = 170000;


function hasInjected() {
    if (typeof window.ethereum !== 'undefined') {
        return true;
      }
      return false;
}

const providerOptionsNoWallet = {
    ...TallyOpts,
};

const providerOptionsWallet = {
};


async function init() {

    let web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions: hasInjected()? providerOptionsWallet : providerOptionsNoWallet,
        disableInjectedProvider: hasInjected()? false : true,
    });

    provider = await web3Modal.connect();
    web3 = await new Web3(provider);
    // get wallet address
    accounts = await web3.eth.getAccounts();
    console.log(accounts);
    selectedAccount = accounts[0];

    document.getElementById("DivStep1").style.display = "none";
    document.getElementById("DivStep2").style.display = "";
    document.getElementById("validateDivOuter").style.display = "";
    await signUp();
}

// should be triggered automatically based on identifier information.
// connect wallet first
async function signUp() {

    try {

        let res;
        try {
            console.log(userHashForClaim);
            res = await idriss.getIDriss(userHashForClaim);
            console.log(res);
        } catch {
            console.log("User does not exist");
        }
        if (!res) {

            const result = await IdrissCrypto[validateApiName].CreateOTP("Public ETH", identifier, selectedAccount);
            console.log(result.sessionKey);

            idHash = result.hash;
            sessionKey = result.sessionKey;
            document.getElementById("validateDiv").style.display = "";

            if (identifier.match(regT)) {
                twitterId = result.twitterId;
                document.getElementById("accountName").innerHTML = identifier;
                showTwitterVerification(result.twitterMsg);
                console.log(result.twitterMsg);
            } else {
                document.getElementById("OTP").style.display = "";
            }
        } else {

            document.getElementById("validateDivOuter").style.display = "none";
            // add check if connected wallet is owner of registered IDriss
            await claim(paymentsToClaim[0].amount, paymentsToClaim[0].assetType, paymentsToClaim[0].assetContractAddress, assetId);
        }
    } catch (e) {
        triggerError(e);
    }
}

// check if posted/OTP correct
async function validate() {

    try {
        console.log("validate called");
        let valid;
        // call validateOTP only once?
        if (ENV !== "local") {
            // there is no local endpoint so we skip it alltogether
            if (document.getElementById("OTPInput").value) {
                try {
                    valid = await IdrissCrypto[validateApiName].ValidateOTP(document.getElementById("OTPInput").value, sessionKey);
                    document.getElementById("otpError").style.display = "none";
                    document.getElementById("validateDivOuter").style.display = "none";
                } catch {
                    // add case of wrong otp error
                    document.getElementById("otpError").style.display = "block";
                    return;
                }
            } else {
                try {
                    valid = await IdrissCrypto[validateApiName].ValidateOTP("0", sessionKey);
                    document.getElementById("noTweet-error").style.display = "none";
                } catch {
                    // add case of wrong otp error
                    document.getElementById("noTweet-error").style.display = "block";
                    return;
                }
            }
            document.getElementById("validateDivOuter").style.display = "none";

            chainId = await web3.eth.getChainId();
            console.log(chainId);
            if (chainId !== 137) {
                // ToDo: add event listener for chain switch instead?
                try {
                    await provider.request({
                            method: "wallet_switchEthereumChain",
                            params: [{ chainId: "0x89" }],
                        });
                } catch (e) {console.log("network switch failed? ", e)}
            }

            paymentContract = await loadPaymentMATIC(web3);
            // create receiptID for verification
            console.log(String(valid.receiptID));
            // wait until funds arrived => spinner
            document.getElementById("spinner").style.display = "";
            document.getElementById("HeadlineStep2").innerHTML = "Confirm Claiming";
            minBalance = roundUp(valid.gas * 1.1 * 320000, 0);
            checkFunds(selectedAccount, minBalance);
            await new Promise((res) => {
                spinner = document.getElementById("spinner");
                spinner.addEventListener("fundsArrived", (e) => {
                    console.log(e);
                    res();
                });
            });
            document.getElementById("spinner").style.display = "none";
            receipt_hash = await paymentContract.methods.hashReceipt(String(valid.receiptID), selectedAccount).call();
            // let people pay only once
            // add "checkPayment" in case paid is true?
            if (!paid) {
                // ToDo: error handling everywhere
                console.log(valid.gas);
                // faucet gas is sent in ValidateOTP with high gas fee, so should arrive relatively quickly
                // wallet shows very high gas if no funds are available
                document.getElementById("spinnerText").innerHTML = "Confirming transaction 1 out of 2 ...";
                document.getElementById("spinner").style.display = "";
                await sleep(5000).then(() => {
                    console.log("sleeping done inside");
                });

                chainId = await web3.eth.getChainId();
                console.log(chainId);
                if (chainId !== 137) {
                    // ToDo: add event listener for chain switch instead?
                    try {
                        await provider.request({
                                method: "wallet_switchEthereumChain",
                                params: [{ chainId: "0x89" }],
                            });
                    } catch (e) {console.log("network switch failed? ", e)}
                }

                await paymentContract.methods.payNative(receipt_hash, idHash, "IDriss").send({
                    from: selectedAccount,
                    value: 0,
                    gasPrice: valid.gas,
                    gas: GAS_LIMIT_PAY_NATIVE
                });
                paid = true;
                document.getElementById("spinnerText").innerHTML = "Validating transaction...";
            }
            // if successful creates link on registry
            checkedPayment = await IdrissCrypto[validateApiName].CheckPayment("MATIC", sessionKey);
            checkRegistry();
            await new Promise((res) => {
                spinner = document.getElementById("spinner");
                spinner.addEventListener("signUpSuccess", (e) => {
                    console.log(e);
                    res();
                });
            });
            await sleep(5000).then(() => {
                console.log("Waiting 5 seconds");
            });
            document.getElementById("spinnerText").innerHTML = "Confirming transaction 2 out of 2 ...";
        }
        console.log("Success sign-up");
        await claim(paymentsToClaim[0].amount, paymentsToClaim[0].assetType, paymentsToClaim[0].assetContractAddress, assetId);
        console.log("Sucessful claim");
    } catch (e) {
        triggerError(e);
    }
}

async function claim(amount, assetType, assetContractAddress, assetId = 0) {
    try {
        document.getElementById("HeadlineStep2").innerHTML = "Confirm Claiming";
        document.getElementById("spinner").style.display = "";
        document.getElementById("spinnerText").innerHTML = "Confirming transaction 2 out of 2 ...";
        const asset = {
            amount,
            type: assetType,
            assetContractAddress,
            assetId,
        };
        console.log("inside claim");
        gas = await web3.eth.getGasPrice()
        console.log({ userHash, identifier, walletType, asset, gas });
        let result;
        console.log("calling claim");
        console.log(userHashForClaim, claimPassword, asset.type.valueOf(), asset.assetContractAddress ?? ZERO_ADDRESS);

        const chainId = await web3.eth.getChainId();
        console.log(chainId);
        if (chainId !== 137) {
            // ToDo: add event listener for chain switch instead?
            try {
                await provider.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: "0x89" }],
                    });
            } catch (e) {console.log("network switch failed? ", e)}
        }
        gas = await web3.eth.getGasPrice()
        sendToAnyoneContract = await loadSendToAnyoneContract(web3);
        // claim contract call directly?
        result = await sendToAnyoneContract.methods.claim(userHashForClaim, claimPassword, asset.type.valueOf(), asset.assetContractAddress ?? this.ZERO_ADDRESS).send({
            from: selectedAccount,
            gasPrice: gas,
            gas: 250000,
            nonce: await web3.eth.getTransactionCount(selectedAccount),
        });

        console.log(result);
        if (result && result.status) {
            document.getElementById("spinnerText").innerHTML = "Confirmed transaction 2 out of 2!";
            await sleep(5000).then(() => {
                console.log("Trigger success page");
                document.getElementById("spinner").style.display = "none";
                triggerSuccess();
            });
        } else  {
            triggerError(result);
        }
    } catch (e) {
        triggerError(e);
    }
}

function showTwitterVerification(msg_) {
    document.getElementById("twitterMsg").style.display = "";
    document.getElementById("tweetContent").innerText = msg_;
}

// ToDo: check if minBalance is correct
async function checkFunds(_address, _minBalance) {
    interval = setInterval(async function () {
        balance = await defaultWeb3Polygon.eth.getBalance(_address);
        console.log("Balance is: ", balance);
        if (balance > _minBalance) {
            spinner = document.getElementById("spinner");
            spinner.dispatchEvent(Object.assign(new Event("fundsArrived")));
            clearInterval(interval);
        }
    }, 1000);
}

// get other idriss to not hit rate limits?
async function checkRegistry() {
    intervalRegistry = setInterval(async function () {
        spinner = document.getElementById("spinner");
        res = await idriss.resolve(identifier);
        if (res["Public ETH"]) {
            spinner.dispatchEvent(Object.assign(new Event("signUpSuccess")));
            clearInterval(intervalRegistry);
        }
    }, 1000);
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function copyTweet() {
    let content = document.getElementById("tweetContent").innerHTML;
    await navigator.clipboard.writeText(content);
    document.getElementById("tooltip").style.visibility = "visible";
    setTimeout(function () {
        tooltip.style.visibility = "hidden";
    }, 1000);
}

function hideNFTPath() {
    document.getElementById("DivStep2").style.display = "none";
    document.getElementById("DivStep3").style.display = "none";
    document.getElementById("DivClaimToken").style.display = "";
    document.getElementById("DivClaimNFT").style.display = "none";
}

function triggerSuccess() {
    zerionLink = "https://app.zerion.io/" + selectedAccount + "/overview";
    if (assetType == 2) {
        zerionLink = "https://app.zerion.io/" + selectedAccount + "/nfts";
        document.getElementById("DivClaimNFTDone").style.display = "";
    }
    document.getElementById("zerion").href = zerionLink;
    document.getElementById("DivStep1").style.display = "none";
    document.getElementById("DivStep2").style.display = "none";
    document.getElementById("DivStep3").style.display = "";
}


function triggerError(e) {
    document.getElementById("DivError").value = JSON.stringify(e);
    document.getElementById("DivError").style.display = "";
    document.getElementById("DivStep0").style.display = "none";
    document.getElementById("DivStep1").style.display = "none";
    document.getElementById("DivStep2").style.display = "none";
    document.getElementById("DivStep3").style.display = "none";
}

async function triggerDiscord() {
    await navigator.clipboard.writeText("Claim page error: "+document.getElementById("DivError").value);
    const url =  'https://discord.gg/VMcJ9uF6u8';
    window.open(url, '_blank');
}

function triggerRetry() {
    location.reload();
}