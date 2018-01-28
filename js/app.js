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

    let showPyResult = (result) => {
        $('#pyfile').html('output')
        editor2.setValue(result.out.replace('b\'', ''))
    }

    $.ajax({
        url: 'http://localhost:5000/compile',
        type: 'POST',
        crossDomain: true,
        data: { content:content },
        success: showPyResult,
        error: showPyResult,
    })

}

function runJavascript() {
    let content = editor1.getValue()

    let showJsResult = (result) => {
        $('#jsfile').html('output')
        console.log(result)
        editor1.setValue(result.out.replace('b\'', ''))
    }
    $.ajax({
        url: 'http://localhost:5000/js',
        type: 'POST',
        crossDomain: true,
        data: { content:content },
        success: showJsResult,
        error: showJsResult,
    })
}

function runZulip() {
    let content = editor1.getValue()
    $.ajax({
        url: 'http://localhost:5000/zulip',
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
    } 
      
     else if (command == 'py_move_left') {
        if (python) _wmoveleft(editor2)
    } else if (command == 'py_move_right') {
        if (python) _wmoveright(editor2)
    } else if (command == 'py_move_up') {
        if (python) _lineUp(editor2)
    } else if (command == 'py_move_down') {
        if (python) _lineDown(editor2)
    }
    
     else if (command == 'js_move_left') {
        if (javascript) _wmoveleft(editor1)
    } else if (command == 'js_move_right') {
        if (javascript) _wmoveright(editor1)
    } else if (command == 'js_move_up') {
        if (javascript) _lineUp(editor1)
    } else if (command == 'js_move_down') {
        if (javascript) _lineDown(editor1)
    } else if (command === 'dexter_javascript'){
        python = false
        javascript = true
        console.log("Calling jsView")
        $('#editorspane').css('grid-template-columns', '100% 0% 0%');
    }else if (command === 'dexter_python'){
        python = true
        javascript = false
        $('#editorspane').css('grid-template-columns', '0% 0% 100%');
    } else if (command === 'dexter_full'){
        python = true
        javascript = true
        $('#editorspane').css('grid-template-columns', '49.75% 0.5% 49.75%');
    } else if (command == 'dexter_run') {
        runPython()
        runJavascript()
    } else if (command == 'dexter_run_py') {
        runPython()
    } else if (command == 'dexter_run_js') {
        runJavascript()
    } else if (command == 'dexter_zulip') {
        runZulip()
    } else if (command == 'dexter_clear') {
        editor2.setValue('')
        $('#jsfile').html('index.js')
        $('#pyfile').html('index.py')
        editor1.setValue('')
    } else if (command == 'dexter_redo') {
        _undo()
    } else if (command == 'dexter_redo') {
        _redo()
    } else if (command == 'dexter_add_closing_bracket') {

    }
}
