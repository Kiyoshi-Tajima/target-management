from flask import Flask
from flask_login import LoginManager
from db import db
from .models.user import User

def create_app(test_config=None):

    app = Flask(__name__, instance_relative_config=True)
    # read setting
    app.config.from_object("settings")
    
    if test_config is not None:
        app.config.from_mapping(test_config)

    # initialize DB Marshmallow
    db.init_app(app)

    with app.app_context():
        """ import parts """
        from .api import login, memu, items, users
        """ register Blueprints """
        app.register_blueprint(login.login_bp)
        app.register_blueprint(memu.menu_bp)
        app.register_blueprint(items.items_bp)
        app.register_blueprint(users.users_bp)
        
        # Flask Login
        login_manager = LoginManager()
        login_manager.init_app(app)
        login_manager.login_view = "login_bp.index"
        
    return app, login_manager

# Export app
app, login_manager = create_app()

# 認証ユーザの呼び出し
@login_manager.user_loader
def load_user(id):
    # login_requiredデコレータを設定したメソッドでコールされる
    # ここでユーザの権限云々もできるが、全体的な持ち回りになりそうなので
    # 個別のapiで実装するようにしたほうがベターでは。。。
    print('load_user')
    return User.query.get(int(id))
