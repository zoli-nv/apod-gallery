import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const SearchBar = (props) => {
  return(
      <div className="pa2 tc">
        <DatePicker 
            className="tc pa2 border-shades light-color dark-shades bodoni f3"
            calendarClassName="bodoni border-shades"
            dateFormat="dd/MM/yyyy"
            onChange={props.searchChange}
            selected={props.date}
            minDate={new Date(2015, 0, 1)}
            maxDate={new Date()}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"/>
      </div>
    );
}

export default SearchBar;