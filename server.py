import sqlalchemy.exc, traceback, re, json
from flask import Flask, request, render_template, Response, send_from_directory, session, app, redirect, url_for
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from functools import wraps
from werkzeug import secure_filename
from time import mktime, time
import os, random

app = Flask(__name__, static_folder='site', template_folder='./')

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:ryan@test/blog_commit?charset=utf8mb4'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
app.config.from_object(__name__)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    page_name = db.Column(db.String(30), index=True)
    content = db.Column(db.Text)
    author = db.Column(db.String(30))
    email = db.Column(db.String(50))
    comment_time = db.Column(db.TIMESTAMP)
    deleted = db.Column(db.BOOLEAN)

    def __init__(self, page_name, content, author, email, comment_time, deleted=False):
        self.page_name = page_name
        self.content = content
        self.author = author
        self.email = email
        self.comment_time = comment_time
        self.deleted = deleted

class visit_statistics(db.Model):
    page_name = db.Column(db.String(30), primary_key=True, unique=True)
    last_visit_time = db.Column(db.TIMESTAMP)
    count = db.Column(db.Integer, default=0)

    def __init__(self, page_name):
        self.page_name = page_name
        self.last_visit_time = str(datetime.now())
        self.count = 0

def DbCommit(successRet='success'):
    try:
        db.session.commit()
    except sqlalchemy.exc.IntegrityError as exc:
        traceback.print_exc()
        return str(exc.args), 501
    return successRet

@app.route("/create_database", methods=['POST'])
def CreateDB():
    db.create_all()

@app.route('/blog')
@app.route('/blog/')
def index():
    return send_from_directory(app.static_folder, 'index.html')
@app.route('/blog/<path:path>')
def Server(path):
    if path.endswith('/') or len(path) == 0:
        path += 'index.html'
    return send_from_directory(app.static_folder, path)

def CommentParser(comment): # convert comment obj to dict
    cm = dict(
        id = comment.id,
        pageName = comment.page_name,
        author = comment.author,
        email = comment.email,
        content = comment.content,
        commentTime = int(mktime(comment.comment_time.timetuple())),
        deleted = comment.deleted
    )
    return cm

@app.route("/visit/<pageName>", methods=['GET'])
def VisitPage(pageName):
    visit = visit_statistics.query.filter_by(page_name=pageName).first()
    if not visit:
        newVisit = visit_statistics(page_name=pageName)
        db.session.add(newVisit)
        ret = dict(
            count = 0,
            time = int(mktime(datetime.now().timetuple()))
        )
    else:
        ret = dict(
            count = visit.count,
            time = int(mktime(visit.last_visit_time.timetuple()))
        )
        visit.count += 1
        visit.last_visit_time = str(datetime.now())
    return json.dumps(ret)

@app.route("/comments/<pageName>", methods=['GET'])
def GetComments(pageName):
    return json.dumps([CommentParser(comment) \
        for comment in Comment.query.filter_by(page_name=pageName).all()])

@app.route("/comments/<pageName>", methods=['POST'])
def AddComments(pageName):
    print(pageName)
    cm = request.get_json()
    print(cm)
    newComment = Comment(page_name=pageName, author=cm['author'], content=cm['content'],
        email=cm['email'], comment_time=str(datetime.now()))
    db.session.add(newComment)
    return DbCommit()

@app.route("/comments/<commentId>", methods=['DELETE'])
def DeleteComments(commentId):
    comment = Comment.query.filter_by(id=commentId).first()
    if not comment:
        return 'No record', 404
    comment.deleted = True
    return DbCommit()

@app.route("/recover/comments/<commentId>", methods=['POST'])
def RecoverComment(commentId):
    comment = Comment.query.filter_by(id=commentId).first()
    if not comment:
        return 'No record', 404
    comment.deleted = 0
    return DbCommit()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8088, debug=True)
