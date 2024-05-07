from templates.config import conn

cur = conn.cursor()


def add_user(username, password):
    # sql commands
    sql = "INSERT INTO user(username, password) VALUES ('%s','%s')" % (username, password)
    print(username)
    # execute(sql)
    conn.ping(reconnect=True)
    cur.execute(sql)
    conn.commit()
    conn.close()
