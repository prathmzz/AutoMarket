from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token
from app.models.user import User

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    db = current_app.db
    user_model = User(db)
    result = user_model.create_user(data)
    return jsonify(result), 201 if "message" in result else 400

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    db = current_app.db
    user_model = User(db)

    auth_result = user_model.login_user(data["email"], data["password"])
    if "error" in auth_result:
        return jsonify(auth_result), 401

    # Fetch full user object (excluding password)
    user = db["users"].find_one({"email": data["email"]}, {"password": 0})
    access_token = create_access_token(identity=str(user["_id"]))

    # Convert ObjectId to string
    user["_id"] = str(user["_id"])

    return jsonify({
        "message": "Login successful",
        "token": access_token,
        "user": user
    }), 200
