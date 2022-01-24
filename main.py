from flask import Flask, render_template, redirect
from flask_cors import CORS
import json, os, subprocess, shutil, sys

app = Flask(__name__)
CORS(app)

if not os.path.isfile('words.txt'):
    with open('words.txt', 'w') as f:
        f.write('{}')

words = json.load(open('words.txt', 'r'))

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)