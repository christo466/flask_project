from flask import Flask, request,render_template,redirect,url_for
from markupsafe import escape

app = Flask(__name__)

@app.route("/")
def hello_world():
    return render_template("index.html")


@app.route("/<name>")
def hello(name):
    return f"Hello, {escape(name)}!"

@app.route('/user/<int:user_id>', methods=['GET', 'POST', 'PATCH'])
def user_details(user_id):
    # show the user profile for that user
    if request.method == 'GET':
        return "listing all the user details"
    
    elif request.method == 'POST':
        return "creating new user details"
    
    elif request.method =='PATCH':
        return f"updating the user data {escape(user_id)}"
    
@app.route('/success/<int:score>', methods=["GET", "POST"])
def success(score):
    res = ""
    if score >= 50:
        res = "PASS"
    else:
        res = "FAIL"
    return render_template("result.html",result=res)






@app.route('/submit', methods=['POST','GET'])
def submit():
    total_avg_score = 0
    if request.method == "POST":
        Science = float(request.form['Science'])
        Maths = float(request.form["Maths"])
        total_avg_score = (Science + Maths)/2
        
    res = ""
    if total_avg_score >=50:
        res = "succes"
    else:
        res = "fail"
    return redirect(url_for(res,score=total_avg_score))
 
 
 
    
    
@app.route("/postdata", methods = ["POST"])
def post_data(username):
    if (request.data):
        reading_post_data = request.get_json()
        
        return reading_post_data["name"], 200
        
    else:
        return "The request has no data"
    
    
    

@app.route("/postdata/<username>", methods = ["POST","GET"])
def post_user_data(username):
    if (request.data):
        reading_post_data = request.get_json()
        
        # return reading_post_data["name"], 200
        return f'User data {escape(username)}'
    else:
        return "The request has no data"
    
    
    
    

@app.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user
    return f'User {escape(username)}'

@app.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return f'Post {post_id}'

@app.route('/post/<float:post_id>')
def show_post_float(post_id):
    # show the post with the given id, the id is an integer
    return f'Post {post_id}'

@app.route('/path/<path:subpath>')
def show_subpath(subpath):
    # show the subpath after /path/
    return f'Subpath {escape(subpath)}'