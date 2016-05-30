# coding=utf-8
# Created by 0xFranCiS on May 10, 2016.

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from contextlib import contextmanager
from redis import StrictRedis


engine = create_engine('postgresql://postgres:postgres@localhost/finetrust', echo=True)
# engine = create_engine('sqlite://')

Session = sessionmaker(bind=engine)


@contextmanager
def open_session():
    session = Session()
    try:
        yield session
        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()


def open_conn():
    return engine.connect()


redis = StrictRedis(decode_responses=True)


def db2redis_user():
    with open_conn() as conn:
        id_name = 'identifier_user'
        sql = 'SELECT username, name, password, archived, active, alias FROM t_user'
        cur = conn.execute(sql)
        rs = cur.fetchall()
        pipe = redis.pipeline()
        pipe.multi()
        pipe.delete(id_name)
        for r in rs:
            pipe.hmset('user:%s' % r[0], {
                'username': r[0],
                'name': r[1],
                'password': r[2],
                'archived': r[3],
                'active': r[4],
                'alias': r[5]
            })
            pipe.sadd(id_name, r[0])
        pipe.execute()


