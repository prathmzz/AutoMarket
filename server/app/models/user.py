from werkzeug.security import generate_password_hash, check_password_hash

class User:
    def __init__(self, db):
        self.collection = db["users"]

    def create_user(self, data):
        # Check if email exists
        if self.collection.find_one({"email": data["email"]}):
            return {"error": "Email already exists"}

        hashed_password = generate_password_hash(data["password"])
        user = {
            "name": data["name"],
            "email": data["email"],
            "password": hashed_password,
            "phone": data.get("phone", 0000000000),
            "location": data["location"],
            "favorites": [],
            "ads": [],
            "chats": [],
            "comparing": [],
        }
        self.collection.insert_one(user)
        return {"message": "User created successfully"}

    def login_user(self, email, password):
        user = self.collection.find_one({"email": email})
        if not user:
            print("[DEBUG] User not found with email:", email)
            return {"error": "Invalid credentials"}

        print("[DEBUG] Found user:", user["email"])
        print("[DEBUG] Stored hash:", user["password"])
        print("[DEBUG] Password entered:", password)

        if not check_password_hash(user["password"], password):
            print("[DEBUG] Password hash check failed")
            return {"error": "Invalid credentials"}

        print("[DEBUG] Password hash check passed")
        return {"message": "Login successful", "user": {"email": user["email"], "name": user["name"]}}
