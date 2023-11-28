import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state;
  const {
    firstName: first_name,
    lastName: last_name,
    email,
    phone: phone_number,
    orderDate: order_date,
    orderTime: order_time,
    slot,
  } = formData;
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [message, setMessage] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!isPaying) {
      try {
        // Make a post request to the payment API
        setIsLoading(true);
        const response = await fetch("http://127.0.0.1:5000/api/v1/book", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name,
            last_name,
            email,
            phone_number,
            order_date,
            order_time,
            slot_number: slot,
            price: 100,
            payment: false,
          }),
        });
        // Handle the response from the payment API
        const data = await response?.json();
        if (!data?.payment) {
          setPaymentStatus(false);
          setPaymentId(data?.order_id);
          setIsPaying(true);
        } else {
          setPaymentStatus(true);
          setIsPaying(false);
        }
        setIsLoading(false);
      } catch (error) {
        // Handle any errors that occur during the Pay post request
        console.log(error);
        setIsPaying(false);
        setIsLoading(false);
      }
    } else {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/v1/book/${paymentId}`
        );
        const data = await response?.json();
        if (data?.payment) {
          setPaymentStatus(true);
          setIsPaying(false);
          setMessage("Payment Successful");
        } else {
          setPaymentStatus(false);
          setIsPaying(true);
          setMessage("Payment Not Successful");
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  };
  console.log(paymentId, message);
  const handeleCheck = async () => {
    const response = await fetch(
      `http://127.0.0.1:5000/api/v1/book/${paymentId}`
    );
    const data = await response?.json();
    console.log(data);
    if (data.payment) {
      navigate("/receipt", { state: formData });
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col justify-center items-center h-1/2 w-1/3 mx-auto mt-28 p-8 border mb-2 border-y-primaryText">
        <h4 className="text-center text-4xl mb-10 w-full">Payment Page</h4>
        <p className="text-left w-full mb-2 font-bold">Order Summary:</p>
        <ul className="text-left w-full">
          <li className="flex justify-between py-2">
            <p>Name:</p>
            <span>
              {formData.firstName} {formData.lastName}
            </span>{" "}
          </li>

          <li className="flex justify-between py-2">
            <p>Product:</p>
            <span>{formData.service}</span>
          </li>
          {formData.email && (
            <li className="flex justify-between py-2">
              <p>Email:</p>
              <span>{formData.email}</span>
            </li>
          )}

          <li className="flex justify-between py-2">
            <p>Phone number:</p>
            <span>{formData.phone}</span>
          </li>

          <li className="flex justify-between py-2">
            <p>Date:</p>
            <span>{formData.orderDate}</span>
          </li>

          <li className="flex justify-between py-2">
            <p>Time:</p>
            <span>{formData.orderTime}</span>
          </li>

          <li className="flex justify-between py-2">
            <p>Slot:</p>
            <span>{formData.slot}</span>
          </li>
          <li className="flex justify-between py-2">
            <p>Account:</p>
            <span>CBE: 123456789</span>
          </li>

          <li className="flex justify-between py-2">
            <p>Price:</p>
            <span>100 ETB</span>
          </li>

          <li className="flex justify-between py-2">
            <p>Payment Status:</p>
            <span>{paymentStatus ? "Paid" : "Not Paid"}</span>
          </li>
        </ul>
        <p>{paymentStatus}</p>
        <button
          className="w-1/3 justify-end mt-3 mb-auto py-1 rounded-lg bg-slate-300 hover:bg-slate-500 hover:text-white transition-all"
          disabled={isLoading}
          onClick={isPaying ? handeleCheck : handlePay}
        >
          {isLoading ? "..." : isPaying ? "Check" : "Pay"}
        </button>
      </div>
    </div>
  );
}
export default Payment;
