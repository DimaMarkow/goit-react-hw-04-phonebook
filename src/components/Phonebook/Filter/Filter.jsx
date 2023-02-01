import PropTypes from 'prop-types';
import css from 'components/Phonebook/phonebook.module.css';

const Filter = ({ handleFilter, filterValue }) => {
  const handleChange = e => {
    handleFilter(e.currentTarget);
  };

  return (
    <>
      <form className={css.buttonWrapper}>
        <label className={css.text}>
          Find a contact by name
          <input
            type="text"
            name="filter"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={filterValue}
            onChange={handleChange}
          />
        </label>
      </form>{' '}
    </>
  );
};

export default Filter;

Filter.propTypes = {
  filterValue: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
};
