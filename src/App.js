import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState([
    {
      name: "Eric Elliot",
      phone: "222-555-8575",
    },
    {
      name: "John Doe",
      phone: "111-222-3333",
    },
    {
      name: "Jane Smith",
      phone: "444-555-6666",
    },
  ]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const AddContact = (contact) => {
    fetch("http://localhost:8000/contacts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    })
      .then((response) => response.json())
      .then((data) => setContacts([...contacts, data]))
      .catch((error) => console.error(error));
  };

  const handleDeleteContact = (id) => {
    fetch(`/api/contacts/${id}/`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedContacts = contacts.filter((contact) => contact.id !== id);
        setContacts(updatedContacts);
      })
      .catch((error) => console.error(error));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="card history z-depth-0">
        <div className="card-body">
          <div className="d-flex justify-content-center align-items-center mb-5">
            <div className="d-flex align-items-center">
              <i className="fa fa-address-book fa-2x mr-2 mb-6"></i>
              <h3 className="font-weight-bold mb-0">Phone Book App</h3>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center py-2">
            <h5 className="font-weight-reguar">Contacts</h5>
            <button
              type="button"
              className="btni btn-light btn-sm font-weight-regular"
              onClick={AddContact}
            >
              + Add Contact
            </button>
          </div>
          <div className="row">
            <div className="col-12">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="list-group-flush">
            {filteredContacts.map((contact, index) => (
              <div
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0"
                key={index}
              >
                <div className="d-flex justify-content-start align-items-center">
                  <p className="mb-0"></p>
                  <div className="d-flex flex-column">
                    <p className="small font-weight-bold mb-0">
                      {contact.name}
                    </p>
                    <p className="small text-muted mb-0">
                      <i className="fa fa-phone" aria-hidden="true"></i>{" "}
                      {contact.phone}
                    </p>
                  </div>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteContact(index)}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
