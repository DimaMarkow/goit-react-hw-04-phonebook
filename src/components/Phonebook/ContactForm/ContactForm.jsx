import { useState } from 'react';
import PropTypes from 'prop-types';
import css from 'components/Phonebook/phonebook.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

const ContactForm = ({ onSubmit }) => {
  const [state, setState] = useState(INITIAL_STATE);

  const resetForm = () => {
    setState(INITIAL_STATE);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(state);
    resetForm();
  };

  return (
    <>
      <h2 className={css.title}>Phonebook</h2>
      <form className={css.buttonWrapper} onSubmit={handleSubmit}>
        <label className={css.text}>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={state.name}
            onChange={handleChange}
          />
        </label>
        <label className={css.text}>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={state.number}
            onChange={handleChange}
          />
        </label>
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
