from flask import Flask, render_template, redirect, request
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

@app.route('/newWord')
def makeNewWord():
    return render_template('newWord.html')

@app.route('/word/<wordName>')
def showWordDetails(wordName):
    wordData = {}
    for word in words:
        if word == wordName:
            wordData = words[word]
            break

    return render_template('wordDetail.html', wordName=wordName, wordData=wordData)

@app.route('/api/getWords', methods=['GET'])
def getWords():
    return json.dumps(words)

@app.route('/api/newWord', methods=['POST'])
def newWord():
    for item in ['wordName', 'wordMeaning', 'wordSyn', 'wordSen']:
        if item not in request.json:
            return "ERROR: {} field was not present in request. Request failed.".format(item)

    wordName = request.json['wordName']
    meaning = request.json['wordMeaning']
    syn = request.json['wordSyn']
    sen = request.json['wordSen']
    words[wordName] = {
        'meaning': meaning,
        'syn': syn,
        'sen': sen,
    }

    json.dump(words, open('words.txt', 'w'))
    return "Added new word successfully!"

@app.route('/api/deleteWord', methods=['POST'])
def deleteWord():
    if 'wordToDelete' not in request.json:
        return "No wordToDelete field was present in request. REQUEST FAILED."
    if request.json['wordToDelete'] not in words:
        return "No such word is in database. Request failed."
    
    del words[request.json['wordToDelete']]
    json.dump(words, open('words.txt', 'w'))

    return "Successfully deleted word {}!".format(request.json['wordToDelete'])

@app.route('/assets/indexJS')
def indexJS():
    return fileContent('index.js')

@app.route('/assets/newWordJS')
def newWordJS():
    return fileContent('newWord.js')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)