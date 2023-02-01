import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import css from './phonebook.module.css';
import ContactForm from 'components/Phonebook/ContactForm/ContactForm';
import ContactList from 'components/Phonebook/ContactList/ContactList';
import Filter from 'components/Phonebook/Filter/Filter';

const INITIAL_STATE = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const Phonebook = () => {
  const [contacts, setContacts] = useState(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    return parsedContacts ? parsedContacts : INITIAL_STATE;
  });
  const [filter, setFilter] = useState('');

  const formSubmitHandler = data => {
    const contactID = nanoid();
    const newContact = { ...data, id: contactID };

    const normalizedName = newContact.name.toLowerCase();

    const repeatedContact = contacts.some(
      contact => contact.name.toLowerCase() === normalizedName
    );
    const alertString = newContact.name + ' is already in contacts.';
    if (repeatedContact) {
      alert(alertString);
      return;
    }

    setContacts(prevState => [...prevState, newContact]);
  };

  const filterHandler = data => setFilter(data.value);

  const deleteContact = idForDelete => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== idForDelete)
    );
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div className={css.wrapper}>
      <ContactForm onSubmit={formSubmitHandler} />
      <Filter handleFilter={filterHandler} filterValue={filter}></Filter>
      <ContactList
        contacts={visibleContacts}
        onDeleteContact={deleteContact}
      ></ContactList>
    </div>
  );
};

export default Phonebook;
