from flask import Blueprint, jsonify, request, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId

fav_bp = Blueprint("favs", __name__)

@fav_bp.route("/my-favs", methods=["GET"])
@jwt_required()
def get_my_favs():
    db = current_app.db
    user_id = get_jwt_identity()

    user = db["users"].find_one({"_id": ObjectId(user_id)})
    fav_ids = user.get("favorites", [])

    cars = list(db["cars"].find({"_id": {"$in": [ObjectId(cid) for cid in fav_ids]}}))
    for car in cars:
        car["_id"] = str(car["_id"])
        car["seller_id"] = str(car["seller_id"])

    return jsonify(cars), 200

# ✅ Add car to favorites
@fav_bp.route("/add-to-fav", methods=["POST"])
@jwt_required()
def add_to_favorites():
    db = current_app.db
    user_id = get_jwt_identity()
    data = request.get_json()
    car_id = data.get("car_id")

    if not car_id:
        return jsonify({"error": "car_id is required"}), 400

    db["users"].update_one(
        {"_id": ObjectId(user_id)},
        {"$addToSet": {"favorites": car_id}}  # ensures no duplicates
    )

    return jsonify({"message": "Car added to favorites"}), 200

# ✅ Remove car from favorites
@fav_bp.route("/remove-from-fav", methods=["POST"])
@jwt_required()
def remove_from_favorites():
    db = current_app.db
    user_id = get_jwt_identity()
    data = request.get_json()
    car_id = data.get("car_id")

    if not car_id:
        return jsonify({"error": "car_id is required"}), 400

    db["users"].update_one(
        {"_id": ObjectId(user_id)},
        {"$pull": {"favorites": car_id}}  # removes if present
    )

    return jsonify({"message": "Car removed from favorites"}), 200