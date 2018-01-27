var nlp = null;
var mic = null;

var python = true;
var javascript = true;

var dexterIsRunning = true;

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
        if (IsKnownCommand(entities.intent)) {
            commandHandlers(entities.intent)
            return
        }

        if (!dexterIsRunning) {
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

function runPython() {
    let content = editor2.getValue()
    $.ajax({
        url: 'http://localhost:5000/compile',
        type: 'POST',
        crossDomain: true,
        data: { content:content },
        success: console.log,
        error: console.log,
    })
}

function runPython() {
    let content = editor1.getValue()
    $.ajax({
        url: 'http://localhost:5000/js',
        type: 'POST',
        crossDomain: true,
        data: { content:content },
        success: console.log,
        error: console.log,
    })
}

function commandHandlers(command) {
    if (command == 'dexter_start') {
        dexterIsRunning = true
    } else if (command == 'dexter_stop') {
        dexterIsRunning = false
    } else if (command == 'move_left') {
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
    } else if (command === 'dexter_javascript'){
        python = false
        javascript = true
        console.log("Calling jsView")
        $('#editorspane').css('grid-template-columns', '100% 0% 0%');
    }else if (command === 'dexter_python'){
        python = true
        javascript = false
        $('#editorspane').css('grid-template-columns', '0% 0% 100%');
    }else if (command === 'dexter_full'){
        python = true
        javascript = true
        $('#editorspane').css('grid-template-columns', '49.75% 0.5% 49.75%');
    }
}
