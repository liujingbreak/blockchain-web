var $ = require('jquery');

var msgDom = $('#msg');

$.ajax('https://mainnet.infura.io/0igjuzk4gci1GfrRy9Pa', {
	method: 'POST',
	data: '{"id":1,"jsonrpc":"2.0","method":"eth_getBalance","params":["0xBdA833f73C22c9Ca786969c5e3ab9b77db6B05B5","latest"]}'
})
.then(function(res) {
	msgDom.html(res.result + ' -> 10进制' + parseInt(res.result, 16));
});


var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider());
var version = web3.version.api;

console.log(version);

var etherscanDom = $('#etherscan');
$.ajax('http://api.etherscan.io/api', {
	method: 'GET',
	data: {
		module: 'contract',
		action: 'getabi',
		address: '0xc2d346915414047795418b16694ca0b3f01251a6',
		apiKey: '3TC4SH4MIZ16ZICFZR21ZUU6A5IIMIIWMI'
	}
})
.then(function(res) {
	debugger;
	if (!res.result)
		return;
	var jsonData = letsFuckTheseFields(eval(res.result));
	etherscanDom.html(jsonData.etherReceived);
});

function letsFuckTheseFields(jsonData) {
	var fuckingMap = {};
	for (var i = 0, l = jsonData.length; i < l; i++) {
		fuckingMap[jsonData[i].name] = jsonData[i];
	}
	return fuckingMap;
}
