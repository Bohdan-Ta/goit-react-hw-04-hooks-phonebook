// import { Component } from "react";
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';

import Sections from '../Section';
import Forms from '../Forms/Forms';
import Contacts from '../Contacts';
import Filter from '../Filter/Filter';

import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.css';

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')),
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts), [contacts]);
  });

  const getDataSubmit = ({ name, number }) => {
    const searchDublicate = contacts.find(contact => contact.name === name);

    searchDublicate
      ? toast.warning(`${name} is already in contacts`)
      : setContacts(contacts => [{ id: nanoid(), name, number }, ...contacts]);
  };

  const onDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId),
    );
  };

  const searchContact = event => {
    setFilter(event.target.value);
  };

  const sensitiveSearch = () => {
    const lowerCaseLetters = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCaseLetters),
    );
  };
  const filteredContacts = sensitiveSearch();
  return (
    <div className={s.container}>
      <Sections title="Phonebook">
        <Forms getSubmit={getDataSubmit} />
      </Sections>
      <Sections title="Contacts">
        <Filter value={filter} searchContact={searchContact} />
        <Contacts
          contacts={filteredContacts}
          onDeleteContact={onDeleteContact}
        />
      </Sections>
      <ToastContainer />
    </div>
  );
}
