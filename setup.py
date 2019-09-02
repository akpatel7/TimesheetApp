import os

DEBUG = True
SECRET_KEY = 'bas*3^3-d&oz_g4e7a(ah^)!a3te5bevgp@m8v=jhkxibc69@s'

# Static file directories.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Save path of log file.
LOG_PATH = 'timesheets.log'

# Shows log reports in the console.
LOG_VERBOSE = True

# Development Webpack setup.
WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': not DEBUG,
        'BUNDLE_DIR_NAME': 'frontend/assets/bundles/',     # must end with slash
        'STATS_FILE': os.path.join(BASE_DIR, 'Timesheets/webpack-stats-dev.json'),
        'POLL_INTERVAL': 0.1,
        'IGNORE': ['.+\.hot-update.js', '.+\.map']
    }
}

# Production Webpack setup.
if not DEBUG:
    print 'PRODUCTION MODE'
    WEBPACK_LOADER.update({
        'DEFAULT': {
            'BUNDLE_DIR_NAME': 'frontend/static/dist/',
            'STATS_FILE': os.path.join(BASE_DIR, 'Timesheets/webpack-stats-prod.json'),
        }
    })
