from collections.abc import Generator
from port.script import process


class ScriptWrapper(Generator):
    def __init__(self, script):
        self.script = script

    def send(self, data):
        command = self.script.send(data)
        return command.toDict()

    def throw(self, type=None, value=None, traceback=None):
        raise StopIteration


def start(sessionId):
    script = process(sessionId)
    return ScriptWrapper(script)
