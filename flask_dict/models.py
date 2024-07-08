from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, String
from sqlalchemy.orm import mapped_column
import logging
from typing import List
from sqlalchemy import ForeignKey

from sqlalchemy import  create_engine, UniqueConstraint
from sqlalchemy.orm import DeclarativeBase,Mapped, sessionmaker, relationship

class Base(DeclarativeBase):
  def __repr__(self):
    return f"{self.__class__.__name__}(id={self.id})"

db = SQLAlchemy(model_class=Base)



class Category(Base):
    __tablename__ = "category"
    __table_args__= (UniqueConstraint('name'),)
    id    : Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    products: Mapped[List["Product"]] = relationship("Product", back_populates="category",cascade="all, delete-orphan")

class Product(Base):
    __tablename__ = "product"
    __table_args__= (UniqueConstraint('name','price'),)
    id    : Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    price: Mapped[int] = mapped_column()
    category_id: Mapped[int] = mapped_column(ForeignKey('category.id'))
    category: Mapped["Category"] = relationship("Category", back_populates="products")
    image = relationship("ProductImage", uselist=False, back_populates="product")

class ProductImage(Base):
    __tablename__ = "product_image"
    id: Mapped[int] = mapped_column(primary_key=True)
    image_url: Mapped[str] = mapped_column(String(255))
    product_id: Mapped[int] = mapped_column(ForeignKey('product.id'))
    product = relationship("Product", back_populates="image")

def init_db(db_uri='postgresql://postgres:christo466@localhost:5432/flaskdb'):
    logger = logging.getLogger("FlaskApp")
    engine = create_engine(db_uri)
    Base.metadata.create_all(engine)
    logger.info("Created database")

def get_session(db_uri):
    engine = create_engine(db_uri)
    Session = sessionmaker(bind = engine)
    session = Session()
    return session