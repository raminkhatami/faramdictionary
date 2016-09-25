/*jshint esversion: 6 */

(function () {
	const { clipboard } = require('electron');

	var menubar = require('menubar');
	var request = require('request');

	var mb = menubar({
		preloadWindow: true,
		width: 1024,
		height: 60,
		x: 0,
		y: 0,
		tooltip: "Faram Dictionary",
		resizable: false
	});
	var old_clipboard_vocab;
	var new_clipboard_vocab;
	mb.on('ready', function ready() {
		old_clipboard_vocab = null;
		new_clipboard_vocab = clipboard.readText();

	});
	// mb.on('show', function () {});
	mb.on('after-create-window', function () {
		// mb.window.show(); }, 100);
		setTimeout(function () {
			showClipBoardVocab();
		}, 100);
		setInterval(function () {
			showClipBoardVocab();
		}, 500);

	});
	function showClipBoardVocab() {
		new_clipboard_vocab = clipboard.readText();
		var regex = /^[a-zA-Z][a-z]+$/g;
		if(!regex.test(new_clipboard_vocab)) {
			return;
		}
		if(old_clipboard_vocab != new_clipboard_vocab) {
			request.post({
				url: 'http://dic.amdz.com/result.php',
				form: {
					inputlang: 'en',
					word: new_clipboard_vocab,
					rels: 'on',
					lang: 'en'
				}
			}, function (err, httpResponse, body) {
				var load = new Buffer(body, encoding = 'utf8');
				var word = new Buffer(new_clipboard_vocab, encoding = 'utf8');
				// console.log("writeVocab("+ new_clipboard_vocab.replace(/'/g, "&#39;").replace(/"/g, "&#34;")+","+ body.replace(/'/g, "&#39;").replace(/"/g, "&#34;") + "')");
				mb.window.webContents.executeJavaScript("writeVocab(`" + word + "`,`" + load + "`)");
			});
			old_clipboard_vocab = new_clipboard_vocab;
			mb.window.show();
			// mb.showWindow();
		}
	}
}) ();
