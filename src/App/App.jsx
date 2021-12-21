// import { Component } from "react";
import { useState } from "react";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";

import Sections from "../Section";
import Forms from "../Forms/Forms";
import Contacts from "../Contacts";
import Filter from "../Filter/Filter";

import "react-toastify/dist/ReactToastify.css";
import s from "./App.module.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  const getDataSubmit = ({ name, number }) => {
    const searchDublicate = contacts.find((contact) => contact.name === name);

    if (searchDublicate) {
      toast.warning(`${name} is already in contacts`);
    } else {
      setContacts((contacts) => [{ id: nanoid(), name, number }, ...contacts]);
    }
  };

  const onDeleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  const searchContact = (event) => {
    setFilter(event.target.value);
  };

  const sensitiveSearch = () => {
    const lowerCaseLetters = filter.toLowerCase().trim();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(lowerCaseLetters)
    );
  };

  return (
    <div className={s.container}>
      <Sections title="Phonebook">
        <Forms getSubmit={getDataSubmit} />
      </Sections>
      <Sections title="Contacts">
        <Filter value={filter} searchContact={searchContact} />
        <Contacts
          contacts={sensitiveSearch()}
          onDeleteContact={onDeleteContact}
        />
      </Sections>
      <ToastContainer />
    </div>
  );
}

//   getDataSubmit = ({ name, number }) => {
//     const { contacts } = this.state;
//     const searchDublicate = contacts.find((contact) => contact.name === name);

//     if (searchDublicate) {
//       toast.warning(`${name} is already in contacts`);
//     } else {
//       this.setState(({ contacts }) => ({
//         contacts: [{ id: nanoid(), name, number }, ...contacts],
//       }));
//     }
//   };

//   onDeleteContact = (contactId) => {
//     this.setState((prevState) => ({
//       contacts: prevState.contacts.filter(
//         (contact) => contact.id !== contactId
//       ),
//     }));
//   };

//   searchContact = (event) => {
//     this.setState({ filter: event.target.value });
//   };

//   sensitiveSearch = () => {
//     const { filter, contacts } = this.state;
//     const lowerCaseLetters = filter.toLowerCase().trim();

//     return contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(lowerCaseLetters)
//     );
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem("contacts");
//     const parsContacts = JSON.parse(contacts);
//     if (parsContacts) {
//       this.setState({ contacts: parsContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.state) {
//       localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
//     }
//   }
//   render() {
//     const { filter } = this.state;
//     const filteredContacts = this.sensitiveSearch();
//     return (
//       <div className={s.container}>
//         <Sections title="Phonebook">
//           <Forms getSubmit={this.getDataSubmit} />
//         </Sections>
//         <Sections title="Contacts">
//           <Filter value={filter} searchContact={this.searchContact} />
//           <Contacts
//             contacts={filteredContacts}
//             onDeleteContact={this.onDeleteContact}
//           />
//         </Sections>
//         <ToastContainer />
//       </div>
//     );
//   }
// }

// export default App;
