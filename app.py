from datetime import datetime

import pandas as pd
from flask import Flask
import csv
from flask_mail import Mail, Message
from flask_sqlalchemy.pagination import Pagination
import pymysql
from flask import Flask
from flask import request
from flask import render_template
from check_login import is_existed, exist_user, is_null
from regist_login import add_user

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return render_template('index.html')


@app.route('/user_login', methods=['GET', 'POST'])
def user_login():
    if request.method == 'POST':  # 注册发送的请求为POST请求
        username = request.form['log_account']
        password = request.form['log_password']
        f = open('user.csv', 'w', encoding='utf-8', newline='')
        writer = csv.writer(f)
        if is_null(username, password):
            login_massage = "温馨提示：账号和密码是必填"
            return render_template('index.html', message_log=login_massage)
        elif is_existed(username, password):
            return render_template('road_sum.html')
        elif exist_user(username):
            login_massage = "温馨提示：密码错误，请输入正确密码"
            return render_template('index.html', message_log=login_massage)
        else:
            login_massage = "温馨提示：不存在该用户，请先注册"
            return render_template('index.html', message_log=login_massage)
    return render_template('index.html')


@app.route('/user_register', methods=["GET", 'POST'])
def user_register():
    if request.method == 'POST':
        username = request.form['re_account']
        password = request.form['re_password']
        print(password)
        if is_null(username, password):
            login_massage = "温馨提示：账号和密码是必填"
            return render_template('register.html', message_res=login_massage)
        elif exist_user(username):
            login_massage = "温馨提示：用户已存在，请直接登录"
            # return redirect(url_for('user_login'))
            return render_template('register.html', message_res=login_massage)
        else:
            add_user(username, password)
            login_massage = "创建成功！请返回登录"
            return render_template('register.html', message_res=login_massage)
    return render_template('register.html')


@app.route('/road_sum')
def road_sum():  # put application's code here
    return render_template('road_sum.html')


@app.route('/road_detail')
def road_detail():  # put application's code here
    return render_template('road_detail.html')


@app.route('/road_board')
def road_board():  # put application's code here
    return render_template('road_board.html')


@app.route('/save_content', methods=['POST'])
def save_content():
    content = request.form['content']
    print(content)
    # 获取当前时间
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # 将内容和时间写入break_rule.txt文件
    with open('break_rule.txt', 'a') as file:
        file.write(f"{current_time}: {content}\n")

    return 'Content saved to break_rule.txt with timestamp'


if __name__ == '__main__':
    app.run()
