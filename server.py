from app import app
from flask import session, jsonify
from datetime import timedelta

# リクエスト前処理
@app.before_request
def before_request():
    print('******** new request ********')
    # セッションの永続期間を再設定する(30分)
    session.permanent = True
    app.permanent_session_lifetime = timedelta(minutes=30)
    session.modified = True

# エラーハンドリング
@app.errorhandler(400)
@app.errorhandler(404)
@app.errorhandler(500)
def error_handler(error):
    print('******** error handler ********')
    response = jsonify({ 
                "error": {
                    "type": error.name, 
                    "message": error.description
                }
    })
    return response, error.code

if __name__ == "__main__":
    app.run(debug=app.config["DEBUG"], port=app.config["PORT"])
