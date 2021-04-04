from flask import Flask

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    # read setting
    app.config.from_object("settings")
    
    if test_config is not None:
        app.config.from_mapping(test_config)

    with app.app_context():
        """ import parts """
        from .views import login, memu
        """ register Blueprints """
        app.register_blueprint(login.login_bp)
        app.register_blueprint(memu.menu_bp)
        
    return app
