""" login view """
from flask import Blueprint, render_template, request, jsonify
import pymysql
import pprint

# webpackからもjsが参照できるようにflask側で調整
# 静的ファイルの場所とURLパスを変更
login_bp = Blueprint(
    "login_bp", __name__, template_folder="templates", 
    static_url_path="/dist", static_folder= "../templates/dist"
)

# すげー単純につなげる場合
def get_connection():
    return pymysql.connect(
        host='localhost',
        db='target_management',
        user='root',
        password='',
        charset='utf8',
        cursorclass=pymysql.cursors.DictCursor
    )

@login_bp.route("/", methods=["GET"])
def index():
    """ root """
    return render_template("index.html")

@login_bp.route("/api/login", methods=["POST"])
def do_login():
    # {'loginId': '', 'password': ''}
    params = request.get_json()
    # すげー単純接続
    con = get_connection()
    
    with con.cursor() as cur:
        try:
            sql = "select * from users where user_id = %s and password = %s"
            cur.execute(sql, (params['loginId'], params['password']))
            
            result = cur.fetchone()
            if result == None:
                return jsonify('{}'), 404
        except Exception as e:
            error_resutl = internal_error(e)
            return error_resutl
        
    return jsonify(result), 200

def internal_error(error):
        
    response = jsonify({ 
                "error": {
                    "type": 'internal_error', 
                    "message": 'exception'
                }
    })

    return response, 500
