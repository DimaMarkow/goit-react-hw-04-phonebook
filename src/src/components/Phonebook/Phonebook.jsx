import React from 'react';
import css from './phonebook.module.css';
import ContactForm from 'components/Phonebook/ContactForm/ContactForm';
import ContactList from 'components/Phonebook/ContactList/ContactList';
import Filter from 'components/Phonebook/Filter/Filter';

import { nanoid } from 'nanoid';

const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

class Phonebook extends React.Component {
  state = { ...INITIAL_STATE };

  formSubmitHandler = data => {
    const contactID = nanoid();
    const newContact = { ...data, id: contactID };

    const normalizedName = newContact.name.toLowerCase();

    const repeatedContact = this.state.contacts.some(
      contact => contact.name.toLowerCase() === normalizedName
    );
    const alertString = newContact.name + ' is already in contacts.';
    if (repeatedContact) {
      alert(alertString);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  filterHandler = data => {
    this.setState({ filter: data.value });
  };

  deleteContact = idForDelete => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== idForDelete
      ),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <div className={css.wrapper}>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <Filter
          handleFilter={this.filterHandler}
          filterValue={this.state.filter}
        ></Filter>
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        ></ContactList>
      </div>
    );
  }
}

export default Phonebook;
