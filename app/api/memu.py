""" menu api """
from flask import Blueprint, render_template, session, jsonify
from flask_login import login_required
from ..models.user import User

# webpackからもjsが参照できるようにflask側で調整
# 静的ファイルの場所とURLパスを変更
menu_bp = Blueprint(
    "menu_bp", __name__, template_folder="templates", 
    static_url_path="/dist", static_folder= "../templates/dist"
)

# メニュー画面表示(直リンク用)
# URLを直接ぶっ叩かれた場合ログインしていなければログイン画面に遷移
@menu_bp.route("/menu", methods=["GET"])
@login_required
def index():
    """ 
        index
        ホスティングサービスが無いのでReactを導入した
        index.htmlを返却する
    """
    return render_template("index.html")

# メニューの認証・権限取得
@menu_bp.route("/api/menu_auth", methods=["GET"])
@login_required
def auth_check():
    # セッションよりIDを取得
    id = session.get('id', 0)
    user = User.query.get(int(id))
    return jsonify({'admin': user.is_administrator()}), 200
