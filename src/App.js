import React, { useState, useEffect } from "react";
import axios from "axios";
import ContactForm from "./components/ContactForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/contacts/")
      .then((response) => setContacts(response.data))
      .catch((error) => setErrorMessage("Failed to fetch Contacts."));
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const AddContact = async (contact) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/contacts/",
        contact
      );
      setContacts([...contacts, response.data]);
    } catch (error) {
      setErrorMessage("Failed to add contact");
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/contacts/${id}/`);
      const updatedContacts = contacts.filter((contact) => contact.id !== id);
      setContacts(updatedContacts);
    } catch (error) {
      setErrorMessage("Failed to delete contact");
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log("filteredContacts", filteredContacts);
  console.log("contacts:", contacts);
  return (
    <>
      <div className="card history z-depth-0">
        <div className="card-body">
          {errorMessage && (
            <div className="alert alert-danger">
              <p>{errorMessage}</p>
            </div>
          )}
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
              className="btn btn-light btn-sm font-weight-regular"
              onClick={() => setShowForm(!showForm)}
            >
              + Add Contact
            </button>
            {showForm && <ContactForm onSubmit={AddContact} />}
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
          <div className="row mt-3">
            <div className="col-12">
              {filteredContacts.length > 0 ? (
                <table className="table table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th>Name</th>
                      <th>Phone Number</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr key={contact.id}>
                        <td>{contact.name}</td>
                        <td>{contact.phone_number}</td>
                        <td>{contact.email}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteContact(contact.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No contacts found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
