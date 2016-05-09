# coding=utf-8
__author__ = 'yinlan'



class Dict(dict):
    pass


class Entity(Dict):
    __table_name__ = None
    __id__prop__ = None
    __version_prop__ = None

    def save(self):
        pass

    @staticmethod
    def load(id):
        pass

    @staticmethod
    def remove(id):
        pass

    @staticmethod
    def load_all():
        pass

    @staticmethod
    def query(spec):
        pass

    @staticmethod
    def from_vo(vo):
        pass



class Table:
    pass


class Session:
    pass


class Transaction:
    pass


class Connection:
    pass


def transactional():
    pass


