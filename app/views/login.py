""" login view """
from flask import Blueprint, render_template, request, jsonify
from db import db
from ..models.user import User, UserSchema, UserItemsSchema
from ..models.item import Item, ItemUserSchema

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
    # {'loginId': '', 'password': ''}
    params = request.get_json()

    # 単純にNativeQuereを発行する
    # sql = "select * from users where user_id = '%s' and password = '%s' limit 1" \
    #         % (params['loginId'], params['password'])
    # result = db.session.execute(sql)
    # res = None
    # for row in result:
    #     res = dict(user_id = row.user_id, password = row.password)

    # SQLAlchemy(User)
    result = None
    user = db.session.query(User).filter(
        User.login_id == params['loginId'], 
        User.password == params['password'], 
    )
    # 発行されるSQLを確認 
    print(user.statement)
    # ヒットした1件を取得
    result = user.first()
    # JSON形式に変換
    user_schema = UserSchema()
    print(user_schema.dump(result))
    
    # コメント(userの登録)
    # hoge = User(user_id='ddd', password='ddd')
    # db.session.add(hoge)
    # db.session.commit()
    
    # ヒットしなかった場合は404
    if not result:
        return jsonify('{}'), 404
        
    return jsonify({'user': user_schema.dump(result)}), 200

def internal_error(error):
    response = jsonify({ 
                "error": {
                    "type": 'internal_error', 
                    "message": 'exception'
                }
    })
    return response, 500
