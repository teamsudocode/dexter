class Mic {
    constructor() {
        this.langs = [
            ['English (India)', 'en-IN'],
            ['Hindi', 'hi-IN']
        ];

        this.final_transcript = '';
        this.current_transcript = '';
        this.recognition = null;
        this.compatible = false;
        this.listening = false;
        this.languageSelector = null;
        this.currentLanguage = this.langs[0][1];
        this.resultDisplay = null;
    }

    static capitalize(s) {
        let first_char = /\S/;
        return s.replace(first_char, function (m) { return m.toUpperCase(); });
    }

    static checkCompatibility() {
        return 'webkitSpeechRecognition' in window ||
            'SpeechRecognition' in window;
    }

    setupRecognitionHandlers() {
        if (!this.recognition) {
            console.log("Recognition not set up. This should not happen.");
            return;
        }
        this.recognition.onstart = function () {
            this.listening = true;
        };
        this.recognition.onerror = function (event) {
            console.log("recognition says: wtf " + event.error);
        };
        this.recognition.onend = function () {
            if (this.listening && this.recognition) {
                this.recognition.start();
            }
        };
        this.recognition.onresult = function (event) {
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    this.current_transcript = event.results[i][0].transcript;
                    // this.final_transcript += event.results[i][0].transcript + '. ';
                }
            }
            console.log(this.current_transcript)
            // this.final_transcript = Mic.capitalize(this.final_transcript);
            // askWatson(current_transcript, change);
            // console.log(this.current_transcript, '--', this.final_transcript);
            if (this.resultDisplay)
                this.resultDisplay.innerText = this.current_transcript;
            // final_span.innerHTML = linebreak(final_transcript);
        };
    }

    setupMic(micElem, outputElem, languageSelect, errorHandlerDiv) {
        // setup language selectors
        if (languageSelect) {
            languageSelector = languageSelect;
            while (languageSelect.options.length > 0)
                languageSelect.options.remove(0);
            for (let i = 0; i < this.langs.length; i++)
                languageSelect.options.add(new Option(this.langs[i][0], this.langs[i][1]));
        }

        // setup mic elem
        micElem.onclick = micClicked;
        resultDisplay = outputElem;
    }

    setLang(lang) {
        if (lang == 'en') this.currentLanguage = 'en-IN';
        else if (lang == 'hi') this.currentLanguage = 'hi-IN';
    }

    micClicked(event) {
        if (this.listening) {
            this.stopListening();
            return;
        }
        try {
            if (en == 1) this.setLang('en');
            else if (hi == 1) this.setLang('hi');
        } catch (e) { }
        this.startListening();
    }


    startListening() {
        if (!this.recognition) {
            this.recognition = new webkitSpeechRecognition();
            this.setupRecognitionHandlers();
        }
        this.listening = true;
        this.final_transcript = '';
        this.recognition.lang = this.currentLanguage;
        this.recognition.start();
    }

    stopListening() {
        if (this.recognition)
            this.listening = false;
        this.recognition = null;
        this.resultDisplay = null;
    }

}


// function askWatson(text, callback) {
//     if (window.jQuery === undefined) {
//         console.log("i need to do ajax. import jquery before me");
//     }
//     if (currentLanguage == 'en-IN')
//         $.get('/askWatson/' + encodeURIComponent(text), callback);
//     else if (currentLanguage == 'hi-IN') {
//         $.get('http://api.mymemory.translated.net/get?q=' + current_transcript + '&langpair=hi|en', function (data) {
//             console.log(data.responseData.translatedText);
//             $.get('/askWatson/' + encodeURIComponent(data.responseData.translatedText), callback);
//         });
//     }
// }

