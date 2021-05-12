from newspaper import Article

from flask import Flask, request, json
app = Flask(__name__)


@app.route('/', methods=['GET'])
def hello_name():
    url = request.json["url"]
    article = Article(url, language='en')
    article.download()
    article.parse()
    return json.dumps({"title": article.title, "description": article.text})

if __name__ == '__main__':
    app.run(host='0.0.0.0')