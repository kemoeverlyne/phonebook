import React, { useState } from "react";

function ContactForm({ AddContact }) {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const contact = { first_name, last_name, phone_number };
    AddContact(contact);
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <label>
        Phone Number:
        <input
          type="text"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <button type="submit">Add Contact</button>
    </form>
  );
}

export default ContactForm;
