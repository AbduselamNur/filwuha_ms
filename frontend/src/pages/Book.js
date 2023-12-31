import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkReservedSlots } from '../apis/utils';
import LoadingSVG from '../assets/images/Loading.svg';

function Book() {
  const navigate = useNavigate();
  const [errorField, setErrorField] = useState('');

  const timeIntervals = [
    '08:00 AM - 09:00 AM',
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '01:00 PM - 02:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM',
  ];

  const [reservedSlots, setReservedSlots] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    orderDate: '',
    orderTime: '',
    slot: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filterUnavailableSlots = () => {
    // Get the slots reserved for the selected date
    const selectedDateSlots = reservedSlots[formData.orderDate];
    // Find the index of the selected time in the timeIntervals array
    const selectedTimeIndex = timeIntervals.findIndex((time) =>
      time.includes(formData.orderTime)
    );

    // If slots are reserved for the selected date and the selected time is valid
    if (selectedDateSlots && selectedTimeIndex !== -1) {
      // Get the slots that are unavailable at the selected time
      const unavailableSlots = selectedDateSlots
        .filter(
          (slotInfo) =>
            slotInfo.time.slice(0, 5) === formData.orderTime.slice(0, 5)
        )
        .map((slotInfo) => slotInfo.slot);

      // Return the slots that are not in the unavailableSlots array
      return [1, 2, 3, 4, 5, 6].filter(
        (slot) => !unavailableSlots.includes(slot)
      );
    }

    // If no slots are reserved for the selected date or the selected time is not valid, return all slots
    return [1, 2, 3, 4, 5, 6];
  };

  const filteredSlots = filterUnavailableSlots();

  let today = new Date().toISOString().split('T')[0];

  let lastDate = new Date();
  lastDate.setDate(lastDate.getDate() + 30);
  lastDate = lastDate.toISOString().split('T')[0];

  useEffect(() => {
    // Define an async function to fetch reserved slots
    const fetchReservedSlots = async () => {
      try {
        // Call the checkReservedSlots function with formData and await its response
        const response = await checkReservedSlots(formData);
        // Set the reservedSlots state with the response
        setReservedSlots(response);
      } catch (error) {
        // If an error occurs, log the error, set the reservedSlots state to an empty object, and set the message state with the error
        console.error(error);
        setReservedSlots({});
        setMessage(error);
      }
    };
    // Call the fetchReservedSlots function
    fetchReservedSlots();
  }, [formData]); // Run this effect whenever formData changes

  // Handle when the inputs change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateFormData = (data) => {
    // Define a regex pattern for phone numbers
    const phoneRegex = /^(07|09)\d{8}$/;

    // Validate the firstName field
    if (!data.firstName || data.firstName.length < 3) {
      setMessage('First name must be at least 4 characters long');
      setErrorField('firstName');
      return false;
    }

    // Validate the lastName field
    if (!data.lastName || data.lastName.length < 3) {
      setMessage('Last name must be at least 4 characters long');
      setErrorField('lastName');
      return false;
    }

    // Validate the phone field length
    if (!data.phone || data.phone.length < 10) {
      setMessage('Phone number must be at least 10 characters long');
      setErrorField('phone');
      return false;
    }

    // Validate the phone field format
    if (!phoneRegex.test(data.phone)) {
      setMessage('Invalid phone number');
      setErrorField('phone');
      return false;
    }

    // Check if lastName and phone fields are not empty
    if (!data.lastName || !data.phone) {
      setMessage('Error input data');
      return false;
    }

    // If all validations pass, reset the error field and return true
    setErrorField('');
    return true;
  };

  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Set the isLoading state to true to indicate that a request is being made
    setIsLoading(true);
    try {
      // Validate the formData
      if (validateFormData(formData)) {
        // If the formData is valid, format the formData
        const formattedFormData = {
          ...formData,
          // Convert the orderTime to a format that includes the hour and zero minutes
          orderTime: `${formData.orderTime.split(' ')[0]}:00`,
        };
        // Navigate to the /payment route with the formattedFormData as state
        navigate('/payment', { state: formattedFormData });
      } else {
        // If the formData is not valid, set the message state with an error message
        setMessage(`Invalid ${errorField}`);
      }
    } catch (error) {
      // If an error occurs, log the error and set the message state with an error message
      console.error('Error submitting form:', error);
      setMessage('Error submitting form. Please try again.');
    } finally {
      // Set the isLoading state to false to indicate that the request has finished
      setIsLoading(false);
    }
  };

  return (
    <div className="flex mt-10">
      <div className="max-w-md mx-auto p-6 border rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Booking</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 ">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className={`border rounded-md p-2 ${
                errorField === 'firstName' ? 'border-red-500' : ''
              }`}
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              className={`border rounded-md p-2 ${
                errorField === 'lastName' ? 'border-red-500' : ''
              }`}
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              className={`border rounded-md p-2 ${
                errorField === 'phone' ? 'border-red-500' : ''
              }`}
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="border rounded-md p-2"
            />
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="border rounded-md p-2"
              required
            >
              <option value="">Select Service</option>
              <option value="Bathing">Bathing</option>
            </select>
            <input
              type="date"
              name="orderDate"
              min={today}
              max={lastDate}
              value={formData.orderDate}
              onChange={handleInputChange}
              placeholder="Date"
              className="border rounded-md p-2"
              required
            />
            <select
              name="orderTime"
              value={formData.orderTime}
              onChange={handleInputChange}
              className="border rounded-md p-2"
              required
            >
              <option value="">Select Time</option>
              {timeIntervals.map((time, index) => (
                <option key={index} value={time.slice(0, 8)}>
                  {time}
                </option>
              ))}
            </select>
            <select
              name="slot"
              value={formData.slot}
              onChange={handleInputChange}
              className="border rounded-md p-2"
              // required
            >
              <option value="">None</option>
              {filteredSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  Slot {slot}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <input
              type="checkbox"
              name="terms"
              onChange={handleInputChange}
              className="mr-2"
              id="terms"
              required
            />
            <label htmlFor="terms">
              I agree to the{' '}
              <a
                href="/terms"
                className="text-blue-500 hover:text-blue-600 transition duration-500 ease-in-out"
              >
                Terms & Conditions
              </a>
            </label>
          </div>
          {message && (
            <p className="text-red-500 text-center mt-5">{message}</p>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold text-lg rounded-lg px-10 py-2 mt-9 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <img
                  src={LoadingSVG}
                  alt="Loading"
                  className="w-6 h-6 inline"
                />
              ) : (
                'Book'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Book;
