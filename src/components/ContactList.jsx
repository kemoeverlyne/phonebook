import React, { useState, useEffect } from "react";

function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("/api/contacts/")
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <tr key={contact.id}>
            <td>{contact.first_name}</td>
            <td>{contact.last_name}</td>
            <td>{contact.phone_number}</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ContactList;
