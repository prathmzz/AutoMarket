from flask import Blueprint, request, jsonify, current_app
from app.models.user import User

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    db = current_app.db
    user_model = User(db)
    result = user_model.create_user(data)
    return jsonify(result)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    db = current_app.db
    user_model = User(db)
    result = user_model.login_user(data["email"], data["password"])
    return jsonify(result)
