""" items view """
from flask import Blueprint, render_template, jsonify
from db import db
from ..models.item import Item, ItemUserSchema

# webpackからもjsが参照できるようにflask側で調整
# 静的ファイルの場所とURLパスを変更
items_bp = Blueprint(
    "items_bp", __name__, template_folder="templates", 
    static_url_path="/dist", static_folder= "../templates/dist"
)

@items_bp.route("/items", methods=["GET"])
def index():
    """ 
        index
        ホスティングサービスが無いのでReactを導入した
        index.htmlを返却する
    """
    return render_template("index.html")

@items_bp.route("/items/all", methods=["GET"])
def get_items():
    """ 
        サンプルとして一旦すべてのitemを取得する
    """
    result = None
    # SQLAlchemy(Item)
    Items = db.session.query(Item)
    # 発行されるSQLを確認
    print(Items.statement)
    # すべて取得する
    result = Items.all()
    # レコード数確認
    print(len(result))
    # JSON形式に変換
    item_user_schema = ItemUserSchema()
    print(item_user_schema.dump(result, many=True))

    # JSON形式で返却する
    return jsonify({'items': item_user_schema.dump(result, many=True)}), 200

def internal_error(error):
    response = jsonify({ 
                "error": {
                    "type": 'internal_error', 
                    "message": 'exception'
                }
    })
    return response, 500
