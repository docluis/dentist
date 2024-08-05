import React, { useState } from "react";

const Services = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [date, setDate] = useState("");
  const [response, setResponse] = useState(null);

  const services = [
    "cleaning",
    "filling",
    "extraction",
    "root-canal",
    "whitening",
  ];

  const handleBookAppointment = (event) => {
    event.preventDefault();
    fetch("/api/book-appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, service, date }),
    })
      .then((res) => res.text())
      .then((text) => setResponse(text))
      .catch((err) => setResponse("An error occurred: " + err));
  };

  const handleInquireServicePrice = (service) => {
    fetch(`/api/inquire-price?service=${service}`)
      .then((res) => res.json())
      .then((data) => setServicePrice(data.price))
      .catch((err) => setServicePrice("An error occurred: " + err));
  };

  return (
    <div>
      <h2>Services</h2>
      <p>
        We offer a variety of dental services to meet your needs. Please book an
        appointment below.
      </p>

      <h3>Inquire Service Price</h3>
      {services.map((service) => (
        <button
          key={service}
          onClick={() => handleInquireServicePrice(service)}
        >
          {service}
        </button>
      ))}
      {servicePrice && <p>Cost: {servicePrice}</p>}

      <h3>Book an Appointment</h3>
      <form onSubmit={handleBookAppointment}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Service: </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default Services;
