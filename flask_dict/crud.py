from flask import Flask, request, render_template, redirect, url_for,make_response,session,flash,jsonify
from markupsafe import escape

languages = [{'name':'javascript'},{'name':'python'},{'name':'ruby'}]
app = Flask(__name__)

@app.route("/", methods=['GET'])
def test():
    return jsonify({"message":"it works"})

@app.route("/lang", methods=['GET'])
def returnAll():
    return jsonify({'languages':languages})

@app.route("/lang/<string:name>", methods=['GET'])
def returnone(name):
    langas = [language for language in languages if language['name'] == name]
    return jsonify({'languages':langas[0]})
    
    
    
# if __name__ == "__main__":
#     app.run(debug=true)