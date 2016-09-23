// Display some statistics about this computer, using node's os module.
var writeVocab = function (vocab, textHtml) {
	$("document").scrollTop();
	$("#vocab").html(vocab);
	function stripScripts(s) {
	    var div = document.createElement('div');
	    div.innerHTML = s;
		var scripts = div.getElementsByTagName('script');
		var links = div.getElementsByTagName('link');
	    var i = scripts.length;
	    var j = links.length;

	    while (i--) {
	      scripts[i].parentNode.removeChild(scripts[i]);
	    }
		while(j--){
			links[j].parentNode.removeChild(links[j]);
		}
	    return div.innerHTML;
	  }
	$("#explanation").html(stripScripts(textHtml));
};
