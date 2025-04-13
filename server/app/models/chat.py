from datetime import datetime
from bson import ObjectId

class Chat:
    def __init__(self, db):
        self.collection = db["chats"]

    def create_chat(self, buyer_id, seller_id, car_id):
        chat = {
            "buyer_id": buyer_id,
            "seller_id": seller_id,
            "car_id": car_id,
            "messages": [],
        }
        result = self.collection.insert_one(chat)
        return {"chat_id": str(result.inserted_id)}

    def add_message(self, chat_id, sender_id, text):
        message = {
            "message_id": str(ObjectId()),
            "sender_id": sender_id,
            "text": text,
            "timestamp": datetime.utcnow()
        }
        self.collection.update_one({"_id": ObjectId(chat_id)}, {"$push": {"messages": message}})
        return {"message": "Message sent"}
