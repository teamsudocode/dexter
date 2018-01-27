from flask import Flask, request, jsonify
from judge import runProcess
from flask_cors import CORS
import zulip

# Keyword arguments 'email' and 'api_key' are not required if you are using ~/.zuliprc
client = zulip.Client(email="mydexter-bot@hack36.zulipchat.com",
                      api_key="gX6ulWhAzExkZcYSAtWgpsAMbrXLjcJn",
                      site="https://hack36.zulipchat.com")

app = Flask('dexter')
CORS(app)


@app.route('/compile', methods=['POST'])
def compile():
    content = r'' + request.form['content']
    # with open('my.py', 'w') as f:
    #     print(exec(content))
    with open('intermediate.py', 'w') as f:
        # print(repr(content).replace("'", ''))
        # new_content = content.replace("'", '')
        for i in content:
            f.write(i)

        # f.write(repr(content).replace("", ''))

    outBuf, errBuf = runProcess(['python3', 'intermediate.py'])
    return jsonify({'out': str(outBuf), 'err': str(errBuf)})


@app.route('/js', methods=['POST'])
def interpret():
    content = r'' + request.form['content']
    # with open('my.py', 'w') as f:
    #     print(exec(content))
    with open('intermediate.js', 'w') as f:
        # print(repr(content).replace("'", ''))
        # new_content = content.replace("'", '')
        for i in content:
            f.write(i)

        # f.write(repr(content).replace("", ''))

    outBuf, errBuf = runProcess(['node', 'intermediate.js'])
    return jsonify({'out': str(outBuf), 'err': str(errBuf)})


@app.route('/zulip', methods=['POST'])
def zulip():
    # email = request.form['email']
    email = 'kuchtohtha@gmail.com'
    content = request.form['content']
    client.send_message({
        "type": "private",
        "to": email,
        "content": content,
    })
    return 'ok'



if __name__ == '__main__':
    app.run(debug=True)
