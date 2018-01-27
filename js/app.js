class App {
    constructor(python, javascript) {
        this.mic = new Mic(this.micResponseHandler)
        this.nlp = setUpNlp()
        this.handlerExecutor = run_handler
        this.python = python
        this.javascript = javascript
    }

    micResponseHandler(text) {
        console.log('response handler says', text)
        let entities = this.nlp.test(text)
        if (!entities) {
            return
        }
        let py_result = py_handler(result)
        let js_result = js_handler(result)
        if (this.javascript) {
            _insertTextAtCursor(editor1, js_result.entity)
        }
        if (this.python) {
            _insertTextAtCursor(editor2, py_result.entity)
        }
    }

}