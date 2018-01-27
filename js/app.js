var nlp = null;
var mic = null;

function newApp(python, javascript) {
    nlp = setUpNlp()
    mic = new Mic(micResponseHandler(nlp, python, javascript))
}

function typeEffect(element, speed) {
    var text = $(element).text();
    $(element).html('');

    var i = 0;
    var timer = setInterval(function () {
        if (i < text.length) {
            $(element).append(text.charAt(i));
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}


function micResponseHandler(nlp, python, javascript) {
    return (text) => {
        console.log('response handler says', text)
        let entities = nlp.test(text)
        if (!entities) {
            return
        }
        let py_result = py_handler(entities)
        let js_result = js_handler(entities)
        if (javascript) {
            _insertTextAtCursor(editor1, js_result.entity)
        }
        if (python) {
            _insertTextAtCursor(editor2, py_result.entity)
        }
        $('#text').html(text);
        typeEffect($('#text'), 75);
    }

}
