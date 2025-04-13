from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from app.models.car import Car

compare_bp = Blueprint("compare", __name__)



# ✅ Add car to compare
@compare_bp.route("/add-to-compare", methods=["POST"])
@jwt_required()
def add_to_compare():
    db = current_app.db
    user_id = get_jwt_identity()
    data = request.get_json()
    car_id = data.get("car_id")

    if not car_id:
        return jsonify({"error": "car_id is required"}), 400

    db["users"].update_one(
        {"_id": ObjectId(user_id)},
        {"$addToSet": {"comparing": car_id}}  # add only if not already present
    )

    return jsonify({"message": "Car added to compare list"}), 200

# ✅ Remove car from compare
@compare_bp.route("/remove-from-compare", methods=["POST"])
@jwt_required()
def remove_from_compare():
    db = current_app.db
    user_id = get_jwt_identity()
    data = request.get_json()
    car_id = data.get("car_id")

    if not car_id:
        return jsonify({"error": "car_id is required"}), 400

    db["users"].update_one(
        {"_id": ObjectId(user_id)},
        {"$pull": {"comparing": car_id}}  # remove from array
    )

    return jsonify({"message": "Car removed from compare list"}), 200

# ✅ Compare cars (get list of cars in user's compare list)
@compare_bp.route("/compare", methods=["GET"])
@jwt_required()
def compare():
    db = current_app.db
    user_id = get_jwt_identity()
    user = db["users"].find_one({"_id": ObjectId(user_id)})

    compare_ids = user.get("comparing", [])

    if not compare_ids:
        return jsonify([])

    cars = list(db["cars"].find({"_id": {"$in": [ObjectId(cid) for cid in compare_ids]}}))
    for car in cars:
        car["_id"] = str(car["_id"])
        car["seller_id"] = str(car["seller_id"])

    return jsonify(cars), 200
