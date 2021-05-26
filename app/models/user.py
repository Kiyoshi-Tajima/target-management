from sqlalchemy.sql.expression import true
from db import db, ma
from sqlalchemy.orm import relationship
from sqlalchemy import Column, BigInteger, String
from marshmallow import fields

class User(db.Model):
    __tablename__ = 'users'
    user_id = Column(BigInteger, primary_key=True)
    login_id = Column(String(20))
    password = Column(String(20))
    user_name = Column(String(128))
    email = Column(String(128))
    
    items = relationship('Item', backref='users')
        
class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User

class UserItemsSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
    
    user_id = ma.auto_field()
    user_name = ma.auto_field()
    items = fields.Nested('ItemSchema', many=True)
    
