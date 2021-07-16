""" login logout API """
from flask import Blueprint, render_template, request, session, jsonify
from flask_login import login_user, logout_user, login_required
from db import db
from ..models.user import User
from ..models.login import Login

# webpackからもjsが参照できるようにflask側で調整
# 静的ファイルの場所とURLパスを変更
login_bp = Blueprint(
    "login_bp", __name__, template_folder="templates", 
    static_url_path="/dist", static_folder= "../templates/dist"
)

@login_bp.route("/", methods=["GET"])
def index():
    """
        index
        ホスティングサービスが無いのでReactを導入した
        index.htmlを返却する
    """
    return render_template("index.html")

@login_bp.route("/api/login", methods=["POST"])
def do_login():
    # {'loginId': '', 'password': ''}で渡ってくる
    params = request.get_json()

    # なんちゃってモデルに設定
    login = Login(params)
    # とりあえず入力チェック
    if not login.valid():
        # だめなら400で終了
        return jsonify({'errors': login.errors}), 400

    # SQLAlchemy(User)
    result = None
    user = db.session.query(User).filter(
        User.login_id == params['loginId'], 
        User.password == params['password'], 
    )
    # ヒットした1件を取得
    result = user.first()    
    # ヒットしなかった場合は404
    if not result:
        return jsonify({'errors': {'invalid': 'ユーザが存在しません。'}}), 404

    # ユーザが存在した場合は、一旦雑にsessionに登録
    session['id'] = result.id
    session['login_id'] = result.login_id
    # flask login
    login_user(result)

    # React側で画面遷移をするだけなので現時点では値返却しない
    return jsonify({}), 200

@login_bp.route("/api/logout", methods=["POST"])
@login_required
def logout():
    # ログアウト処理及びセッションクリア
    logout_user()
    session.clear()
    
    # React側で画面遷移をするだけなので現時点では値返却しない
    return jsonify({}), 200
