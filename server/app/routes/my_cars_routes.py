from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.car import Car
from bson import ObjectId
from datetime import datetime

my_cars_bp = Blueprint("mycars", __name__)


@my_cars_bp.route("/my-cars/my-cars-listings", methods=["GET"])
@jwt_required()
def my_cars_listings():
    db = current_app.db
    user_id = get_jwt_identity()
    car_model = Car(db)

    ads = list(car_model.collection.find({"seller_id": ObjectId(user_id)}).sort("posted_at", -1))
    for ad in ads:
        ad["_id"] = str(ad["_id"])
        ad["seller_id"] = str(ad["seller_id"])

    return jsonify(ads), 200


# 🆕 Post a new car
@my_cars_bp.route("/my-cars/post-car", methods=["POST"])
@jwt_required()
def post_car():
    db = current_app.db
    user_id = get_jwt_identity()
    data = request.get_json()
    car_model = Car(db)

    # Get user's location from the DB
    user = db["users"].find_one({"_id": ObjectId(user_id)}, {"location": 1})
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Add user's location to car data
    data["location"] = user.get("location", "Unknown")

    try:
        result = car_model.create_car(data, user_id)
        return jsonify(result), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400



# ✏️ Edit existing car
@my_cars_bp.route("/my-cars/edit-car", methods=["POST"])
@jwt_required()
def edit_car():
    db = current_app.db
    user_id = get_jwt_identity()
    data = request.get_json()
    car_model = Car(db)

    car_id = data.get("car_id")
    if not car_id:
        return jsonify({"error": "Missing car_id"}), 400

    car = car_model.collection.find_one({"_id": ObjectId(car_id), "seller_id": ObjectId(user_id)})
    if not car:
        return jsonify({"error": "Car not found or unauthorized"}), 404

    update_fields = {
        key: value for key, value in data.items() if key != "car_id"
    }
    update_fields["posted_at"] = datetime.now()

    car_model.collection.update_one(
        {"_id": ObjectId(car_id)},
        {"$set": update_fields}
    )

    return jsonify({"message": "Car updated successfully"}), 200


# ✅ Mark car as sold
@my_cars_bp.route("/my-cars/mark-sold", methods=["POST"])
@jwt_required()
def mark_sold():
    db = current_app.db
    user_id = get_jwt_identity()
    data = request.get_json()
    car_id = data.get("car_id")

    if not car_id:
        return jsonify({"error": "Missing car_id"}), 400

    car = db.cars.find_one({"_id": ObjectId(car_id), "seller_id": ObjectId(user_id)})
    if not car:
        return jsonify({"error": "Car not found or unauthorized"}), 404

    db.cars.update_one(
        {"_id": ObjectId(car_id)},
        {"$set": {"sold": True}}
    )

    return jsonify({"message": "Car marked as sold"}), 200


# ❌ Remove car
@my_cars_bp.route("/my-cars/remove-car", methods=["POST"])
@jwt_required()
def remove_car():
    db = current_app.db
    user_id = get_jwt_identity()
    data = request.get_json()
    car_id = data.get("car_id")

    if not car_id:
        return jsonify({"error": "Missing car_id"}), 400

    result = db.cars.delete_one({
        "_id": ObjectId(car_id),
        "seller_id": ObjectId(user_id)
    })

    if result.deleted_count == 0:
        return jsonify({"error": "Car not found or unauthorized"}), 404

    return jsonify({"message": "Car deleted successfully"}), 200
