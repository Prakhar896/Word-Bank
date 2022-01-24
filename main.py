from flask import Flask, render_template, redirect
from flask_cors import CORS
import json, os, subprocess, shutil, sys

app = Flask(__name__)
CORS(app)

def fileContent(fileName):
    with open(fileName, 'r') as f:
        f_content = f.read()
        return f_content

if not os.path.isfile('words.txt'):
    with open('words.txt', 'w') as f:
        f.write('{}')

words = json.load(open('words.txt', 'r'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/getWords', methods=['GET'])
def getWords():
    return json.dumps(words)

@app.route('/assets/indexJS')
def indexJS():
    return fileContent('index.js')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)