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

    def is_administrator(self):
        return True if self.authority == AuthType.administrator else False
    
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
    
