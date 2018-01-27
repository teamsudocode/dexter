#!/usr/bin/env python3

# Reference
# https://stackoverflow.com/a/31867499
# https://docs.python.org/3/library/threading.html
# https://docs.python.org/3/library/subprocess.html


from subprocess import Popen, PIPE
from threading import Thread
import queue # Python 2

def reader(pipe, q):
    try:
        for line in iter(pipe.readline, b''):
            q.put((pipe, line))
    finally:
        q.put(None)


def runProcess(command, timeout=10):
    process = Popen(command, stdout=PIPE, stderr=PIPE, bufsize=1)
    q = queue.Queue()
    outTh = Thread(target=reader, args=[process.stdout, q])
    errTh = Thread(target=reader, args=[process.stderr, q])
    outTh.start()
    errTh.start()
    outTh.join(timeout=timeout)
    errTh.join(timeout=timeout)

    outBuf, errBuf = b'', b''
    for _ in range(2):
        for source, line in iter(q.get, None):
            # print ("%s: %s" % (source, line))
            if source == process.stdout:
                outBuf += line
            elif source == process.stderr:
                errBuf += line

    return outBuf, errBuf


if __name__ == '__main__':
    # outBuf, errBuf = runProcess(["python3", "sample.py"])
    outBuf, errBuf = runProcess(["gcc", "sample.c"])
    print("stdout:")
    print(outBuf)
    print()
    print("stderr:")
    print(errBuf)

    outBuf, errBuf = runProcess(["./a.out"])
    print("stdout:")
    print(outBuf)
    print()
    print("stderr:")
    print(errBuf)
