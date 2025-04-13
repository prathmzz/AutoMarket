from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from app.models.car import Car

home_bp = Blueprint("home", __name__)

@home_bp.route("/home/home-listings", methods=["GET"])
def get_home_listings():
    db = current_app.db
    car_model = Car(db)

    skip = int(request.args.get("skip", 0))
    limit = int(request.args.get("limit", 10))

    cars = list(car_model.collection.find().skip(skip).limit(limit).sort("posted_at", -1))
    for car in cars:
        car["_id"] = str(car["_id"])
        car["seller_id"] = str(car["seller_id"])

    return jsonify(cars), 200

