import os

class Config:
    SECRET_KEY = 'your secret key'
    DEBUG = True
    
    # mail configuration
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'your email'
    MAIL_PASSWORD = 'Application password here'
    
    # Optional: Customize sender name and address
    MAIL_DEFAULT_SENDER = ('EarXscore noreplay', 'noreply')