const oracleAbi = [
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
    ]

const erc1155Abi = [
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
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "tokenId",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "mint",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "renounceOwnership",
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
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "transferOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
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
					"name": "",
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
	]

const erc721Abi = [
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
	]

const erc20Abi = [
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
	]

const paymentAbi = [
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
	]

const sendToAnyoneAbi = [
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
			"inputs": [],
			"name": "IDrissMappings__ERC1155_Batch_Transfers_Unsupported",
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
	]

const registryAbi = [
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
	]

window.oracleAbi = oracleAbi
window.erc1155Abi = erc1155Abi
window.erc721Abi = erc721Abi
window.erc20Abi = erc20Abi
window.paymentAbi = paymentAbi
window.sendToAnyoneAbi = sendToAnyoneAbi
window.registryAbi = registryAbi
