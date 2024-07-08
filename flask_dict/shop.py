import flask
from models import *
from flask import Flask, request, jsonify 
from sqlalchemy import select
from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields, ValidationError
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from marshmallow import ValidationError
from flask_cors import CORS

app = flask.Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:christo466@localhost:5432/flaskdb"
CORS(app)
db.init_app(app)
@app.route("/")
def home():
    return "Hello, world"

@app.route("/products")
def list_product():
    select_query = db.select(ProductImage).order_by(ProductImage.id.desc())
    products = db.session.execute(select_query).scalars()
    detail = []
    for product in products:
      details = {"id" : product.product.id,
         "product" : product.product.name,
         "price":product.product.price ,
         "category":product.product.category.name,
         "image_url":product.image_url
         }
      detail.append(details)
    return flask.jsonify(detail)

@app.route("/categories")
def list_category():
    select_query = db.select(Category).order_by(Category.id)
    categorys = db.session.execute(select_query).scalars()
    detail = []
    for category in categorys:
      details = {"id" : category.id,
         "name" : category.name,
         
         }
      detail.append(details)
    return flask.jsonify(detail)

@app.route("/product_images")
def list_image():
    
    select_query = db.select(ProductImage).order_by(ProductImage.id)
    images = db.session.execute(select_query).scalars()
    detail = []
    for image in images:
      details = {"id" : image.id,
         "image_url" : image.image_url,
         "product_name":image.product.name
         
         }
      detail.append(details)
    return flask.jsonify(detail)

with app.app_context():
  db.create_all()
  
@app.route('/v0/product/', methods=['POST'])
def product_v0():
    data = request.json
    name = data.get('name')
    price = data.get('price')
    category_id = data.get('category_id')
    product_id = data.get('product_id')
    image_url = data.get("image_url")
    new_product = Product(name=name, price=price, category_id=category_id)
    db.session.add(new_product)
    db.session.commit()
    new_image = ProductImage(image_url=image_url, product_id=new_product.id)
    db.session.add(new_image)
    db.session.commit()
    return jsonify({'message': 'Product added successfully', 'product': {
        'id': new_product.id,
        'name': new_product.name,
        'price': new_product.price,
        'category': new_product.category.name
    }}), 201

@app.route('/product', methods=['POST'])
def product():    
        data = request.json
        name = data.get('name')
        price = data.get('price')
        category_name = data.get('category_name')
        image_url = data.get('image_url')
        
        if not all([name, price, category_name, image_url]):
            return jsonify({'error': 'Fill all fields'}), 400
        category = db.session.query(Category).filter_by(name=category_name).first()
        try:
            price = float(price)
        except ValueError:
            return jsonify({'error': 'Invalid price format'}), 400
        if category is None:
            category = Category(name=category_name)
            db.session.add(category)
            db.session.commit()
        new_product = Product(name=name, price=price, category_id=category.id)
        db.session.add(new_product)
        try:
          db.session.commit()
        except:
          return jsonify({'error': 'Data already exist, Input different data'}), 400
        new_image = ProductImage(image_url=image_url, product_id=new_product.id)
        db.session.add(new_image)
        db.session.commit()

        return jsonify({
            'message': 'Product added successfully',
            'product': {
                'id': new_product.id,
                'name': new_product.name,
                'price': new_product.price,
                'category': category.name
            }
        }), 200

@app.route('/category', methods=['POST'])
def category():
    data = request.get_json()
    name = data.get('name')
    if not name:
        return jsonify({'error': 'Category name is required'}), 400
    new_category = Category(name=name)
    db.session.add(new_category)
    db.session.commit()
    return jsonify({'message': 'Category added successfully', 'category': {
        'id': new_category.id,
        'name': new_category.name,
        
    }}), 201
    
if __name__ == "__main__":
  init_db()
  app.run(port=5000)
