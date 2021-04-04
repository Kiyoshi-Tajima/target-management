""" menu view """
from flask import Blueprint, render_template

# webpackからもjsが参照できるようにflask側で調整
# 静的ファイルの場所とURLパスを変更
menu_bp = Blueprint(
    "menu_bp", __name__, template_folder="templates", 
    static_url_path="/dist", static_folder= "../templates/dist"
)

@menu_bp.route("/menu", methods=["GET"])
def index():
    """ root """
    return render_template("index.html")
