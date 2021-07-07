from db import db, ma
from sqlalchemy import Column, BigInteger, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from marshmallow import fields

class Item(db.Model):
    __tablename__ = 'items'
    item_id = Column(BigInteger, primary_key=True)
    user_id = Column(BigInteger, ForeignKey('users.id'))
    item_name = Column(String(256))
    note = Column(Text)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    user = relationship("User", back_populates="items", viewonly=True)

class ItemSchema(ma.SQLAlchemySchema):
    item_id = fields.Integer()
    item_name = fields.Str()
    note = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    
class ItemUserSchema(ma.SQLAlchemySchema):
    item_id = fields.Integer()
    item_name = fields.Str()
    note = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    # ユーザ情報も紐付ける
    user = fields.Nested('UserSchema', many=False)
