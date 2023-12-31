from filwuha.models import db


class Order(db.Model):
    # Define the table name
    __tablename__ = "orders"

    # Define the table columns
    order_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(45), nullable=False)
    last_name = db.Column(db.String(45), nullable=False)
    email = db.Column(db.String(45), nullable=True)
    phone_number = db.Column(db.String(45), nullable=False)
    order_date = db.Column(db.Date, nullable=False)
    order_time = db.Column(db.Time, nullable=False)
    slot_number = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    payment = db.Column(db.Boolean, nullable=False)

    def __init__(
        self,
        first_name,
        last_name,
        email,
        phone_number,
        order_date,
        order_time,
        slot_number,
        price,
        payment,
    ):
        # Initialize an Order object with the provided arguments
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.phone_number = phone_number
        self.order_date = order_date
        self.order_time = order_time
        self.slot_number = slot_number
        self.price = price
        self.payment = payment

    def serialize(self):
        # Return a dictionary representation of the Order object
        return {
            "order_id": self.order_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "phone_number": self.phone_number,
            "order_date": str(self.order_date),
            "order_time": self.order_time.isoformat(),
            "slot_number": self.slot_number,
            "price": self.price,
            "payment": self.payment,
        }
