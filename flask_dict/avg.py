# app.py
from flask import Flask, request, render_template, redirect, url_for,make_response,session,flash
from markupsafe import escape
from werkzeug.utils import secure_filename
import os


app = Flask(__name__)
app.secret_key = 'christ466'

@app.route("/")
def home():
    username = session.get('username') 
    return render_template("index.html", data=username)

@app.route('/check/<int:score>', methods=["GET", "POST"])
def success(score):
    res = "PASS" if score >= 30 else "FAIL"
    
    exp = {"score":score,"result":res}
    return render_template("result.html", result=exp)

@app.route('/submit', methods=['POST', 'GET'])
def submit():
    total_avg_score = 0
    if request.method == "POST":
        science = float(request.form['science'])
        maths = float(request.form["maths"])
        total_avg_score = (science + maths) / 2
        print(total_avg_score)
    return redirect(url_for("success", score=total_avg_score))



@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        # Get the username from the form
        form_username = request.form.get('username')

        # Retrieve the username from cookies
        cookie_username = request.cookies.get('username')

        if cookie_username == form_username:
            # If the username matches, render the index page with the username
            return render_template('index.html', data=form_username)
        else:
            return "Invalid username or password"
    
    return render_template('login.html')

@app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        # Get the username from the form
        username = request.form.get('username')

        if not username:
            return "Username cannot be empty."

        # Create a response object and set the cookie
        resp = make_response(render_template('index.html', data=username))
        resp.set_cookie('username', username)
        return resp

    return render_template('register.html')

@app.route('/logout')
def logout():
    # Create a response to redirect to the login page
    resp = make_response(redirect(url_for('home')))
    
    # Remove the username cookie
    resp.set_cookie('username', '', expires=0)

    return resp


# @app.route('/logout')
# def logout():
#     session.pop('username', None) # Clear session data
#     return render_template('index.html')



@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        file.save(f"/home/user/git_dict/new_dict/flask_dict/files_1/{secure_filename(file.filename)}")
        
    return render_template("form_input.html")

@app.route('/read-file')
def read_file():
        # Define the file path
        file_path = os.path.join('/home/user/git_dict/new_dict/flask_dict/files_1/', 'dragula.txt')
        try:
          with open(file_path, 'r') as file:
            file_content = file.read()
        except FileNotFoundError:
            file_content = "File not found."

        # Render the template with the file content
        return render_template('fileshow.html', content=file_content)
    