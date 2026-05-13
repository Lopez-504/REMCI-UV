import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';

function DateRangePicker() {
  const [value, setValue] = useState([null, null]);

  return (
    <DatePickerInput
      type="range"
      label="Date range"
      placeholder="Select dates"
      value={value}
      onChange={setValue}
    />
  );
}

export default DateRangePicker;

//Explorar este componente para ver cómo devuelve el rango de fechas