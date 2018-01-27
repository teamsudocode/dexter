from flask import Flask, request, jsonify
from judge import runProcess

app = Flask('dexter')

@app.route('/compile', methods=['POST'])
def compile():
    content = r'' + request.form['content']
    with open('intermediate.py', 'w') as f:
        print(repr(content).replace("'",''))
        f.write(repr(content).replace("",''))

    outBuf,errBuf = runProcess(['python3', 'intermediate.py'])
    return jsonify({
        'out': str(outBuf),
        'err': str(errBuf)
    })


if __name__ == '__main__':
    app.run(debug=True)