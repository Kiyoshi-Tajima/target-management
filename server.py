from app import app
from flask import jsonify

# エラーハンドリング
@app.errorhandler(400)
@app.errorhandler(404)
@app.errorhandler(500)
def notfount_error(error):
    response = jsonify({ 
                "error": {
                    "type": error.name, 
                    "message": error.description
                }
    })

    return response, error.code

if __name__ == "__main__":
    app.run(debug=app.config["DEBUG"], port=app.config["PORT"])
