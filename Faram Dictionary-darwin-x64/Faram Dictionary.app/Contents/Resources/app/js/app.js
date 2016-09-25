// Display some statistics about this computer, using node's os module.
var tts = true;
$(document).ready(function () {
	console.log("ready");
    $('#speaker').on("click", function () {
        tts = !tts;
        $(this).toggleClass("mute");
        $(this).toggleClass("speech");
    });
});
synth = window.speechSynthesis;
var writeVocab = function (vocab, textHtml) {
    $("document").scrollTop();
    $("#vocab").html(vocab);
    if(synth && tts) {
        try {
            var msg = new SpeechSynthesisUtterance(vocab);
            window.speechSynthesis.speak(msg);
        } catch(err) {
            tts = false;
            console.log("speech is not supported");
        }
    }

    function stripScripts(s) {
        var div = document.createElement('div');
        div.innerHTML = s;
        var scripts = div.getElementsByTagName('script');
        var links = div.getElementsByTagName('link');
        var i = scripts.length;
        var j = links.length;

        while(i--) {
            scripts[i].parentNode.removeChild(scripts[i]);
        }
        while(j--) {
            links[j].parentNode.removeChild(links[j]);
        }
        return div.innerHTML;
    }
    $("#explanation").html(stripScripts(textHtml));
};
