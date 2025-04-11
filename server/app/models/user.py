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
            "favorites": [],
            "ads": [],
            "chats": []
        }
        self.collection.insert_one(user)
        return {"message": "User created successfully"}

    def login_user(self, email, password):
        user = self.collection.find_one({"email": email})
        if not user or not check_password_hash(user["password"], password):
            return {"error": "Invalid credentials"}
        return {"message": "Login successful", "user": {"email": user["email"], "name": user["name"]}}
