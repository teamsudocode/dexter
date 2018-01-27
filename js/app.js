var nlp = null;
var mic = null;

var python = true;
var javascript = true;

function newApp() {
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


function commandHandlers(command) {
    if (command == 'move_left') {
        if (javascript) _wmoveleft(editor1)
        if (python) _wmoveleft(editor2)
    } else if (command == 'move_right') {
        if (javascript) _wmoveright(editor1)
        if (python) _wmoveright(editor2)
    } else if (command == 'move_up') {
        if (javascript) _lineUp(editor1)
        if (python) _lineUp(editor2)
    } else if (command == 'move_down') {
        if (javascript) _lineDown(editor1)
        if (python) _lineDown(editor2)
    }
}