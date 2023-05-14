import React, { useState } from "react";

function ContactEditForm({ contact, saveContact }) {
  const [firstName, setFirstName] = useState(contact.first_name);
  const [lastName, setLastName] = useState(contact.last_name);
  const [phoneNumber, setPhoneNumber] = useState(contact.phone_number);

  const handleSubmit = (event) => {
    event.preventDefault();
    saveContact({ id: contact.id, firstName, lastName, phoneNumber });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <label>
        Phone Number:
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default ContactEditForm;
