from flask import Flask,request, jsonify
from werkzeug.middleware.proxy_fix import ProxyFix
import base64


app = Flask(__name__)

# Apply ProxyFix middleware

@app.route('/')
def index():
    return "Hello, World!"


@app.route('/api/data', methods=['POST',"GET"])
def api_data():
    if request.method == 'POST' or 'GET':
        # Retrieve JSON data sent in the request body
        data = request.json
        return jsonify({
            'message': 'JSON received successfully!',
            'data': data
        })
        
@app.route('/upload-json', methods=['POST'])
def upload_file_json():
    data = request.get_json()
    filename = data.get('filename')
    filedata = data.get('filedata')
    
    if not filename or not filedata:
        return jsonify({'error': 'Missing filename or file data'}), 400

    try:
        # Decode the Base64 string
        filedata_binary = base64.b64decode(filedata)
        file_path = os.path.join('/home/user/git_dict/new_dict/flask_dict/files_1/', filename)

        # Save the decoded binary data to a file
        with open(filepath, 'wb') as file:
            file.write(filedata_binary)

        return jsonify({'message': 'File uploaded successfully', 'filename': filename})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
