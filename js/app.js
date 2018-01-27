class App {
    constructor() {
        this.mic = new Mic(this.micResponseHandler)
        this.nlp = setUpNlp()
        this.handlerExecutor = run_handler
    }

    micResponseHandler(text) {
        console.log('response handler says', text)
        let result = this.nlp.test(text)

    }

}