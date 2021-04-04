""" login view """
from flask import Blueprint, render_template, url_for
import os

# webpackからもjsが参照できるようにflask側で調整
# 静的ファイルの場所とURLパスを変更
login_bp = Blueprint(
    "login_bp", __name__, template_folder="templates", 
    static_url_path="/dist", static_folder= "../templates/dist"
)

@login_bp.route("/", methods=["GET"])
def index():
    print(login_bp.static_url_path)
    """ root """
    return render_template("index.html")
