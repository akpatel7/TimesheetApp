import logging
from setup import DEBUG


class Format:
    green = '\033[92m'
    blue = '\033[94m'
    dark_blue = '\033[93m'
    purple = '\033[95m'
    yellow = '\033[42m'
    red = '\033[41m'
    bold = '\033[1m'
    underline = '\033[4m'


class Log:
    '''
    Wrapper for logger to add colors. Looks nice.
    '''

    def __init__(self, app):
        self.app = app
        self.log = logging.getLogger(app)

    def _combine_args(self, *args):
        ''' Concat any dictionary or arrays into strings. '''
        return ' '.join([str(arg) for arg in args])

    def debug(self, *args):
        print Format.bold + Format.blue
        print self._combine_args(*args)

    def warning(self, *args):
        print Format.bold + Format.yellow
        self.log.warning(self._combine_args(args))

    def error(self, *args):
        print Format.bold + Format.red
        self.log.error(self._combine_args(args))

    def exception(self):
        self.log.exception('')
