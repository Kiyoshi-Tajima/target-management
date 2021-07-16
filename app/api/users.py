""" login users API """
from flask import Blueprint, render_template, request, jsonify
from flask_login import login_required
from db import db
from ..models.user import User, UserSchema

# webpackからもjsが参照できるようにflask側で調整
# 静的ファイルの場所とURLパスを変更
users_bp = Blueprint(
    "users_bp", __name__, template_folder="templates", 
    static_url_path="/dist", static_folder= "../templates/dist"
)

@users_bp.route("/users", methods=["GET"])
@users_bp.route("/users/", methods=["GET"])
@users_bp.route("/users/<path:path>", methods=["GET"])
@login_required
def index(path=None):
    """ 
        index
        /user/...でリクエストを受け取った場合
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

@users_bp.route("/api/users/<int:id>", methods=["GET"])
@login_required
def get_user(id):
    """
        ユーザ情報取得
    """
    user = db.session.query(User).get(id)
    
    # 存在しない場合
    if not user:
        return jsonify({}), 404
    
    # JSONに変換
    user_schema = UserSchema()
    return jsonify({'user': user_schema.dump(user)}), 200

@users_bp.route("/api/users/<int:id>/confirm", methods=["post"])
@login_required
def do_confirm(id):
    """
<<<<<<< HEAD
        ユーザ情報検証
=======
        ユーザ情報取得
>>>>>>> master
    """
    params = request.get_json()
    print(params);
    
    # modeにより分岐
    if params["mode"] == "edit":
        # 更新時
        user = db.session.query(User).get(id)
        # 値を設定
        user.set_update_attribute(params)
        # 検証
        if not user.valid():
            # だめなら400で終了
            return jsonify(user.errors), 400
    
    return jsonify({}), 200

@users_bp.route("/api/users/<int:id>/update", methods=["patch"])
@login_required
def do_update(id):
    """
        ユーザ情報検証
    """
    params = request.get_json()
    print(params);
    
    # modeにより分岐
    if params["mode"] == "edit":
        # 更新時
        user = db.session.query(User).get(id)
        # 値を設定
        user.set_update_attribute(params)
        # 検証
        if not user.valid():
            # だめなら400で終了
            return jsonify(user.errors), 400

        # 値は設定されているのでコミットする
        db.session.commit()
    
    return jsonify({}), 200
