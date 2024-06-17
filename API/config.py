import os

class Config:
    SECRET_KEY = 'secret ey will be here'
    DEBUG = True
    
    # mail configuration
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587 # using TSL we can also use SSL 465
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'firaolmekbib511@gmail.com'
    MAIL_PASSWORD = 'admins app password will be here'
    
    # Optional: Customize sender name and address
    MAIL_DEFAULT_SENDER = ('EarXscore noreply', 'noreply')