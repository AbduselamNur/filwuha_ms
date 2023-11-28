import React from "react";
import { useLocation } from "react-router-dom";

function Receipt() {
  const location = useLocation();
  const formData = location.state;
  const {
    firstName: first_name,
    lastName: last_name,
    email,
    phone: phone_number,
    orderDate: order_date,
    orderTime: order_time,
    slot,
    service,
  } = formData;

  return (
    <div className="flex">
      <div className="flex flex-col justify-center items-center h-1/2 w-1/3 mx-auto mt-40 p-8 border mb-2 border-y-primaryText">
        <h4 className="text-center text-4xl mb-10 w-full">Receipt</h4>
        <div className="text-left w-full">
          <p className="font-bold">Order Details:</p>
          <ul className="py-2">
            <li className="flex justify-between">
              <span>Name:</span>
              <span>
                {first_name} {last_name}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Phone number:</span>
              <span>{phone_number}</span>
            </li>
            <li className="flex justify-between">
              <span>Service:</span>
              <span>{service}</span>
            </li>
            <li className="flex justify-between">
              <span>Email:</span>
              <span>{email}</span>
            </li>
            <li className="flex justify-between">
              <span>Date:</span>
              <span>{order_date}</span>
            </li>
            <li className="flex justify-between">
              <span>Time:</span>
              <span>{order_time}</span>
            </li>
            <li className="flex justify-between">
              <span>Slot:</span>
              <span>{slot}</span>
            </li>
            <li className="flex justify-between">
              <span>Price:</span>
              <span>100 ETB</span>
            </li>
            <li className="flex justify-between">
              <span>Payment Status:</span>
              <span>Completed</span>
            </li>
            <br />
          </ul>
        </div>
        <p className="font-bold">Thank you for your purchase!</p>
      </div>
    </div>
  );
}

export default Receipt;
