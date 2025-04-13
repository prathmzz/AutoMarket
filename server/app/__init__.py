from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os
from .routes.home_routes import home_bp
from .routes.fav_routes import fav_bp
from .routes.my_cars_routes import my_cars_bp
from .routes.auth_routes import auth_bp
from .routes.compare_routes import compare_bp




load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client.get_database()


def create_app():
    app = Flask(__name__)
    CORS(app)

    # Secret key for JWT
    # app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")  # Separate secret for JWT
    JWTManager(app)

    app.db = db  # attach db to app

    app.register_blueprint(auth_bp)
    app.register_blueprint(home_bp)
    app.register_blueprint(fav_bp)
    app.register_blueprint(my_cars_bp)
    app.register_blueprint(compare_bp)

    return app
