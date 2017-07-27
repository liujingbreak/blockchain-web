$(function() {
	var amoutDom = $('#amount');
	var progressDom = $('#progress');
	var totalAmount = 5000000;
	var interval = 10 * 1000; // 10 sec
	var percentBase = totalAmount / 100;
	queryAmout();

	function queryAmout() {
		$.ajax('http://api.etherscan.io/api', {
			method: 'GET',
			data: {
				module: 'account',
				action: 'tokenbalance',
				contractaddress: '0x08DDf9bEFBD9d9B5a6caAB525eCf8C8CCA0b9840',
				address: '0xc2d346915414047795418b16694ca0b3f01251a6',
				tag: 'latest',
				apiKey: '3TC4SH4MIZ16ZICFZR21ZUU6A5IIMIIWMI'
			}
		})
		.then(updateUI)
		.fail(function(e) { console.log(e); });
	}

	function updateUI(res) {
		if (!res.result)
			return;
		var amount = parseInt(res.result, 10);
		var a = totalAmount - amount;
		var b = Math.floor(a / percentBase * 10) / 10;
		amoutDom.html(a);
		progressDom.html(b);
		setTimeout(queryAmout, interval);
	}
});

