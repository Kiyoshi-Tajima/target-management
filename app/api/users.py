""" login users API """
from flask import Blueprint, render_template, request, jsonify
from flask_login import login_required
from ..models.user import User, UserSchema

# webpackからもjsが参照できるようにflask側で調整
# 静的ファイルの場所とURLパスを変更
users_bp = Blueprint(
    "users_bp", __name__, template_folder="templates", 
    static_url_path="/dist", static_folder= "../templates/dist"
)

@users_bp.route("/users", methods=["GET"])
@login_required
def index():
    """ 
        index
        ホスティングサービスが無いのでReactを導入した
        index.htmlを返却する
    """
    return render_template("index.html")

@users_bp.route("/api/users", methods=["GET"])
@login_required
def users():
    """
        検索処理 
    """
    params = request.values
    users = User.get_user_list(params)
    
    # 検索結果がない場合
    if len(users) == 0:
        return jsonify({}), 404
    
    # JSONに変換
    user_schema = UserSchema()
    return jsonify({'users': user_schema.dump(users, many=True)}), 200
