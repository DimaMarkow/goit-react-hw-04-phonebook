import React from 'react';
import PropTypes from 'prop-types';

import css from 'components/Phonebook/phonebook.module.css';

class ContactList extends React.Component {
  render() {
    const contacts = this.props.contacts;

    return (
      <>
        <h2 className={css.title}>Contacts</h2>
        <ul className={css.buttonWrapper}>
          {contacts.map(({ id, name, number }) => (
            <li key={id} className={css.contact}>
              <p className={css.text}>
                {name} {number}
              </p>
              <button
                type="button"
                className={css.btnDel}
                onClick={() => this.props.onDeleteContact(id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};

ContactList.defaultProps = {
  contacts: [],
};
