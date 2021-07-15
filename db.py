from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

db = SQLAlchemy(session_options={'autocommit': False, 'autoflush': False})
ma = Marshmallow()

# initialize DB Marshmallow
def init_db(app):
    db.init_app(app)
    ma.init_app(app)
