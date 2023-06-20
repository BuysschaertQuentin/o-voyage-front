import { useRef, useState } from 'react';
import { useAppDispatch } from '../../../hooks/redux';

import countryData from '../../../data/countryData';
import { createTravel } from '../../../store/reducers/travels';

function TravelForm() {
  const [countrySearch, setCountrySearch] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [numberOfAttendees, setNumberOfAttendees] = useState(0);
  const [title, setTitle] = useState('');

  const countryInput = useRef(null);
  const dispatch = useAppDispatch();

  function handleCountrySearch(event: React.ChangeEvent<HTMLInputElement>) {
    setCountrySearch(event.target.value);
  }

  function handledepartureDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDepartureDate(event.target.value);
  }

  function handlearrivalDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    setArrivalDate(event.target.value);
  }

  function handlenumberOfAttendeesChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNumberOfAttendees(event.target.value);
  }

  function handleCountryClick(event) {
    setCountrySearch(event.target.innerText);
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  const filteredCountryData = countryData.filter((country) => {
    if (!countrySearch.trim().length) {
      return true;
    }
    return country.name.toLowerCase().includes(countrySearch.trim().toLowerCase());
  });

  const countryList = filteredCountryData.map((country) => (
    <li 
    key={country.name}
    className="cursor-pointer px-3 hover:bg-warm"
    onClick={handleCountryClick}
    >
      {country.name}
    </li>
  ));

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newTravel = {
      title,
      to: countrySearch,
      departureDate,
      arrivalDate,
      numberOfAttendees,
    };

    dispatch(createTravel(newTravel));
  }

  return (
    <form
      className="flex flex-col justify-center items-center bg-medium py-5"
      onSubmit={handleSubmit}
    >
      <div>
        <input
          type="text"
          required
          placeholder="Destination"
          aria-label="Destination"
          className="input input-bordered mr-2"
          value={countrySearch}
          onChange={handleCountrySearch}
          ref={countryInput}
        />
        {countrySearch.length > 1 &&
          countryInput.current === document.activeElement && (
            <ul className="fixed bg-lightest border border-darkest">
              {countryList}
            </ul>
          )}
        <input
          type="date"
          required
          className="input input-bordered mr-2"
          value={departureDate}
          onChange={handledepartureDateChange}
        />
        <input
          type="date"
          required
          className="input input-bordered mr-2"
          value={arrivalDate}
          onChange={handlearrivalDateChange}
        />
        <input
          type="number"
          required
          min="0"
          max="30"
          name="nb-travelers"
          placeholder="Nombre de participants"
          aria-label="Nombre de participants"
          className="input input-bordered mr-2"
          value={numberOfAttendees}
          onChange={handlenumberOfAttendeesChange}
        />
        <input
          type="text"
          required
          placeholder="Titre du voyage"
          aria-label="Titre du voyage"
          className="input input-bordered mr-2"
          value={title}
          onChange={handleTitleChange}
        />
        <button type="submit" className="btn ml-2">
          Créer
        </button>
      </div>
    </form>
  );
}

export default TravelForm;