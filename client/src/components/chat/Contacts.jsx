import { useState, useEffect } from "react";
import { Modal, Input, Card } from "antd";
import axios from "axios";

const Contacts = ({ open, onCancel, createNewChat, currUser, role }) => {
  const [searchValue, setSearchValue] = useState("");
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (!currUser) return;
    switch (role) {
      case "patient":
        axios
          .get("http://localhost:10000/chat/patient-contacts/" + currUser?._id)
          .then((response) => {
            setContacts([...response.data]);
          });
        break;
      case "pharmacist":
        axios
          .get(
            "http://localhost:10000/chat/pharmacist-contacts/" + currUser?._id
          )
          .then((response) => {
            setContacts([...response.data]);
          });
        break;
    }
  }, [currUser]);

  const handleContactSelect = (contact) => {
    createNewChat(contact);
    onCancel();
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Modal
      open={open}
      title="Choose a contact"
      onCancel={onCancel}
      footer={null}
      width={300}
    >
      <Input
        placeholder="Search contacts"
        value={searchValue}
        onChange={handleSearch}
        style={{ marginBottom: "16px" }}
      />
      <div className="new-chat-contacts">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact, index) => (
            <Card
              className="new-chat-contact-card"
              key={index}
              onClick={() => handleContactSelect(contact)}
              style={{
                color: "var(--main-text-color)",
              }}
            >
              {role == "doctor" ? "" : "Dr."} {contact.name}
            </Card>
          ))
        ) : (
          <div>You have initiated a chat with all available individuals.</div>
        )}
      </div>
    </Modal>
  );
};

export default Contacts;
