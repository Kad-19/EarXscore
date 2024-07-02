# run/wsgi used to start flask application

from API.app import create_app, db
from API.app.models import User

app = create_app()



@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User}

if __name__ == '__main__':
    app.run(debug=True)
