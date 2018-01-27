class App {
    constructor() {
        this.mic = new Mic(this.micResponseHandler)
        this.nlp = setUpNlp()
    }

    micResponseHandler(text) {
        console.log('response handler says', text)
    }

}