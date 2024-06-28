import os

class Config:
    SECRET_KEY = 'firacil'
    DEBUG = True
    
    # mail configuration
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'firaolmekbib511@gmail.com'
    MAIL_PASSWORD = 'sfoa ugnl gncc pmyv'
    
    # Optional: Customize sender name and address
    MAIL_DEFAULT_SENDER = ('EarXscore noreplay', 'noreply')