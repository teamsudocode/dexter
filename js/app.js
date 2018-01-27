var nlp = null;
var mic = null;

function newApp(python, javascript) {
    nlp = setUpNlp()
    mic = new Mic(micResponseHandler(nlp, python, javascript))
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
    }
    
}