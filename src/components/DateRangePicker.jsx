import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';

//CSS
import './dateRangePicker.css'

function DateRangePicker({ value, onChange }) {

  return (
    <DatePickerInput
      clearable
      type="range"
      label="Date range"
      placeholder="Select dates"
      value={value}
      onChange={onChange}
    />
  );
}

export default DateRangePicker;

//Note: date range picker returns a list with 2 string in ISO format, so they can be 
//      passed directly to open-meteo like this 

/*
const [startDate, endDate] = dateRange;

const url =
  `https://archive-api.open-meteo.com/v1/archive` +
  `?latitude=${lat}` +
  `&longitude=${lng}` +
  `&start_date=${startDate}` +
  `&end_date=${endDate}` +
  `&hourly=temperature_2m`;
*/




/* further options for Date picker input

minDate={new Date()}      // Prevents selecting dates in the past
maxDate={new Date(new Date().getFullYear(), 11, 31)} // Limits to this year
valueFormat="DD MMM, YY"
numberOfColumns={2}

const accentColor= 'rgb(255, 0, 0)';

styles={{
    day: {
      "&[dataSelected], &[dataSelected]:hover": {
        backgroundColor: `${accentColor}`,
        color: "white",
      },

      "&[dataInRange], &[dataInRange]:hover": {
        backgroundColor: `${accentColor}`,
        color: "white",
        opacity: "0.5",
      },

      "&[dataFirstInRange], &[dataFirstInRange]:hover": {
        backgroundColor: `${accentColor}`,
        color: "white",
        opacity: "1",
      },

      "&[dataLastInRange], &[dataLastInRange]:hover": {
        backgroundColor: `${accentColor}`,
        color: "white",
        opacity: "1",
      },
    },
    input: {
      "&:focus": {
        borderColor: accentColor,
      },
    },
  }}

//Manipulate dates:
const date = new Date();
date.setDate(date.getDate() - 6);

console.log(date.toDateString());

*/

