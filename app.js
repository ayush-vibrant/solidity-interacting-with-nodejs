require('dotenv').config() ;

const Web3 = require('web3');

const infuraKey = process.env.INFURA_KEY;

const web3 = new Web3(new Web3.providers.HttpProvider( `https://ropsten.infura.io/v3/${infuraKey}`));

const contract = new web3.eth.Contract([
    [
        {
            "constant": true,
            "inputs": [],
            "name": "to",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "transaction_no",
                    "type": "uint256"
                }
            ],
            "name": "getTransaction",
            "outputs": [
                {
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "name": "seller",
                    "type": "address"
                },
                {
                    "name": "orderId",
                    "type": "string"
                },
                {
                    "name": "orderPlatform",
                    "type": "string"
                },
                {
                    "name": "productSno",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "health",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "order_id",
                    "type": "string"
                },
                {
                    "name": "product_sno",
                    "type": "string"
                },
                {
                    "name": "transaction_date",
                    "type": "uint256"
                },
                {
                    "name": "buyer",
                    "type": "address"
                }
            ],
            "name": "sendTransaction",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "from",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "_buyerAddr",
                    "type": "address"
                }
            ],
            "payable": true,
            "stateMutability": "payable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "transaction_no",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "transaction_date",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "name": "orderPlatform",
                    "type": "string"
                }
            ],
            "name": "TransactionSent",
            "type": "event"
        }
    ]
], '0xfBf264aA4693B52a395D77ba2ba0575E5Ce1BbB5');


// contract.methods.output().call({from: '0x8863ae48646c493efF8cd54f9Ffb8Be89669E62A'}, function(error, result) {
//     console.log(result);
// });

// Write to blockchain
// Pass 'Transaction data' to blockchain
contract.methods.sendTransaction().send();

// Read from blockchain
// Get based upon 'Transaction number'
contract.methods.getTransaction().call();

// Listen to events on blockchain for OLX
const results = await contract.getPastEvents(
    'TransactionSent',
    {
      filter: {
        orderPlatform: 'OLX'
      },
      fromBlock: 0
    }
);

console.log(results);


// Sample web3.js interaction

// var _buyerAddr = /* var of type address here */ ;
// var dealContract = new web3.eth.Contract([{"constant":true,"inputs":[],"name":"to","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"transaction_no","type":"uint256"}],"name":"getTransaction","outputs":[{"name":"buyer","type":"address"},{"name":"seller","type":"address"},{"name":"orderId","type":"string"},{"name":"orderPlatform","type":"string"},{"name":"productSno","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"health","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"order_id","type":"string"},{"name":"product_sno","type":"string"},{"name":"transaction_date","type":"uint256"},{"name":"buyer","type":"address"}],"name":"sendTransaction","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"from","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_buyerAddr","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"transaction_no","type":"uint256"},{"indexed":false,"name":"transaction_date","type":"uint256"},{"indexed":true,"name":"orderPlatform","type":"string"}],"name":"TransactionSent","type":"event"}]);
// var deal = dealContract.deploy({
//     data: '0x6060604052604051602080610c2783398101604052808051906020019091905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050610b76806100b16000396000f30060606040526004361061006d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063131519811461007257806333ea3dc8146100c75780637633a22c146102a1578063aeafa3df1461032f578063d5ce3389146103ec575b600080fd5b341561007d57600080fd5b610085610441565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100d257600080fd5b6100e86004808035906020019091905050610467565b604051808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001806020018060200180602001848103845287818151815260200191508051906020019080838360005b83811015610194578082015181840152602081019050610179565b50505050905090810190601f1680156101c15780820380516001836020036101000a031916815260200191505b50848103835286818151815260200191508051906020019080838360005b838110156101fa5780820151818401526020810190506101df565b50505050905090810190601f1680156102275780820380516001836020036101000a031916815260200191505b50848103825285818151815260200191508051906020019080838360005b83811015610260578082015181840152602081019050610245565b50505050905090810190601f16801561028d5780820380516001836020036101000a031916815260200191505b509850505050505050505060405180910390f35b34156102ac57600080fd5b6102b4610706565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102f45780820151818401526020810190506102d9565b50505050905090810190601f1680156103215780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6103ea600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610749565b005b34156103f757600080fd5b6103ff610a6c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080610472610a91565b61047a610a91565b610482610a91565b60006002600088815260200190815260200160002060050160009054906101000a900460ff1615156104b357600080fd5b6002600088815260200190815260200160002090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16826002018360030184600401828054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105b35780601f10610588576101008083540402835291602001916105b3565b820191906000526020600020905b81548152906001019060200180831161059657829003601f168201915b50505050509250818054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561064f5780601f106106245761010080835404028352916020019161064f565b820191906000526020600020905b81548152906001019060200180831161063257829003601f168201915b50505050509150808054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106eb5780601f106106c0576101008083540402835291602001916106eb565b820191906000526020600020905b8154815290600101906020018083116106ce57829003601f168201915b50505050509050955095509550955095505091939590929450565b61070e610a91565b6040805190810160405280600781526020017f72756e6e696e6700000000000000000000000000000000000000000000000000815250905090565b3373ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156107a457600080fd5b60036000815480929190600101919050555060c0604051908101604052808273ffffffffffffffffffffffffffffffffffffffff1681526020013373ffffffffffffffffffffffffffffffffffffffff1681526020018581526020016040805190810160405280600381526020017f4f4c58000000000000000000000000000000000000000000000000000000000081525081526020018481526020016001151581525060026000600354815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040820151816002019080519060200190610907929190610aa5565b506060820151816003019080519060200190610924929190610aa5565b506080820151816004019080519060200190610941929190610aa5565b5060a08201518160050160006101000a81548160ff02191690831515021790555090505060405180807f4f4c580000000000000000000000000000000000000000000000000000000000815250600301905060405180910390207f86f82cc8d97970a12eb9a6e75b54e37d093f566264d9a930ad58183f0dfb939b33600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660035486604051808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183815260200182815260200194505050505060405180910390a250505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b602060405190810160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610ae657805160ff1916838001178555610b14565b82800160010185558215610b14579182015b82811115610b13578251825591602001919060010190610af8565b5b509050610b219190610b25565b5090565b610b4791905b80821115610b43576000816000905550600101610b2b565b5090565b905600a165627a7a7230582010a4126e8226d6fa85d09e9beee7ed62111290464980d7a27e5c7e2a4a6533e80029',
//     arguments: [
//         _buyerAddr,
//     ]
// }).send({
//     from: web3.eth.accounts[0],
//     gas: '4700000'
// }, function (e, contract){
//     console.log(e, contract);
//     if (typeof contract.address !== 'undefined') {
//         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
//     }
// })