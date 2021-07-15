from sqlalchemy.sql.expression import false, true
from db import db, ma
from sqlalchemy.orm import relationship
from sqlalchemy import Column, BigInteger, String, Enum
from marshmallow import fields
from flask_login import UserMixin
import enum

class AuthType(str, enum.Enum):
    administrator = "administrator"
    member = "member"

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = Column(BigInteger, primary_key=True, nullable=False)
    login_id = Column(String(20), nullable=False, unique=True)
    password = Column(String(20), nullable=False)
    user_name = Column(String(128), nullable=False)
    email = Column(String(128))
    authority = Column(Enum(AuthType), nullable=False)
    
    items = relationship('Item', backref='users')

    # 管理者かどうか確認
    def is_administrator(self):
        return True if self.authority == AuthType.administrator else False
    
    # 更新時、画面からの値を設定
    def set_update_attribute(self, params):
        # エラーメッセージのインスタンス変数を作成
        self.errors = {'fatal': False}
        # ユーザ画面からくる値をインスタンスに設定
        for key in list(params["user"].keys()):
            setattr(self, key, params["user"][key])
    
    # 入力チェック
    def valid(self):
        validate = True
        # 一旦ストレートに書きます。
        if not self.login_id:
            self.errors['login_id'] = 'ログインIDは必須入力です。'
            validate = False
        if not self.password:
            self.errors['password'] = 'パスワードは必須入力です。'
            validate = False
        if not self.user_name:
            self.errors['user_name'] = 'ユーザ名は必須入力です。'
            validate = False
            
        return validate
    
    @classmethod
    def get_user_list(self, params):
        # ダサいがこうするしかなく。。。
        users = db.session.query(self)
        if params['userName']:
            users = users.filter(
                self.user_name == params['userName']
            )
        
        if params['email']:
            users = users.filter(
                self.email.like("%{}%".format(params['email']))
            )        
        # order by 
        users = users.order_by(self.id)
        
        return users.all()    
    
class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User

class UserItemsSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
    
    login_id = ma.auto_field()
    user_name = ma.auto_field()
    items = fields.Nested('ItemSchema', many=True)
    
