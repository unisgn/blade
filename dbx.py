# coding=utf-8
# Created by 0xFranCiS on May 10, 2016.

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from contextlib import contextmanager


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


