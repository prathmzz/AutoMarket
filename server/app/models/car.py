from datetime import datetime
from bson import ObjectId

class Car:
    def __init__(self, db):
        self.collection = db["cars"]

    def create_car(self, data, seller_id):
        # Validate required fields
        required_fields = [
            "name", "make", "model", "price", 
            "year_of_purchase", "transmission", 
            "owners", "images", "fuel_type"
        ]
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            raise ValueError(f"Missing required fields: {', '.join(missing_fields)}")

        # Validate images (must have at least 1)
        if "images" not in data or len(data["images"]) < 1:
            raise ValueError("At least 1 image is required")

        # Validate price (must be positive)
        if not isinstance(data["price"], (int, float)) or data["price"] <= 0:
            raise ValueError("Price must be a positive number")

        car = {
            # Required fields
            "name": data["name"],
            "make": data["make"],
            "model": data["model"],
            "price": data["price"],
            "year_of_purchase": data["year_of_purchase"],
            "transmission": data["transmission"],
            "images": data["images"],
            "owners": data["owners"],
            "seller_id": ObjectId(seller_id) if not isinstance(seller_id, ObjectId) else seller_id,
            "posted_at": datetime.now(),
            "fuel_type": data["fuel_type"],

            # Optional fields with defaults
            "location": data.get("location", "Unknown"),
            "mileage": data.get("mileage", 0),
            "description": data.get("description", "this car is for sale"),
            "color": data.get("color"),
            "insurance_valid_until": data.get("insurance_valid_until"),
            "engine_capacity": data.get("engine_capacity"),
        }

        result = self.collection.insert_one(car)
        return {"car_id": str(result.inserted_id), "message": "Car posted successfully"}