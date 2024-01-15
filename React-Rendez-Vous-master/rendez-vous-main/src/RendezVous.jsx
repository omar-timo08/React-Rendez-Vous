import React, { useState } from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';





/*const adresse = [
  { city: "Marrakech", place: ["place1", "place2"] },
  { city: "Casablanca", place: ["place3", "place4"] },
  { city: "Rabat", place: ["place5", "place6"] },
  
];*/
const RendezVous = () => {
  const [city, setCity] = useState("");
  const [reference, setReference] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  //const [place, setPlace] = useState([]);
  const [date, setDate] = useState(null);
  //const [adresse, setAdresse] = useState(adresse);
  const [conditions, setConditions] = useState({
    cond1: false,
    cond2: false,
    cond3: false,
    cond4: false,
    cond5: false,
    cond6: false,
    cond7: false,
  });

  async function save(e) {
    e.preventDefault();

    // Vérifier si au moins une des conditions est cochée
    if (Object.values(conditions).some((condition) => condition)) {
        alert("Impossible de s'inscrire en raison de conditions médicales.");
        return;
    }
    const formattedDate = date ? date.toISOString().substring(0, 10) : '';
    //const adresse = `${city}, ${place}`;
      const queryParams = new URLSearchParams(window.location.search);
      const name = queryParams.get('name');
    
    try {
      await axios.post("http://localhost:8888/rendez-vous/priseRendezVous/"+name, {
        adresse: city,
        reference: reference,
        date: formattedDate,   
      });

      window.location.replace('http://localhost:8888/rendez-vous/getPdf/'+name+'/'+reference);
      /*alert("Inscription réussie");
      setRegistrationSuccess(true);
      setCity("");
      setReference("");
      //setPlace("");
      setDate("");*/
  } catch (err) {
      alert("Échec de l'inscription");
    }

}


  const handleSubmit = (e) => {
    e.preventDefault();
    };
  

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  /*const handleCityChange = (e) => {
    setCity(e.target.value);
    //const selectedCity = adresse.find((item) => item.city === e.target.value);
    if (selectedCity) {
      setPlace(selectedCity.place[0]);
    }
  };*/

  const handleCheckboxChange = (condition) => {
    setConditions((prevConditions) => ({
        ...prevConditions,
        [condition]: !prevConditions[condition],
    }));
};

  return (
    

    <div className="Rendez-Vous">
      <h2>Rendez Vous</h2>
        <form className="RendezVous-form" onSubmit={handleSubmit}>  
          <label htmlFor="refreference">Full name</label>
                <input
                    value={reference}
                    name="reference"
                    onChange={(e) => setReference(e.target.value)}
                    id="reference"
                    placeholder="reference"
                /> 
          <label htmlFor="city">Full name</label>
                <input
                    value={city}
                    name="city"
                    onChange={(e) => setCity(e.target.value)}
                    id="city"
                    placeholder="city"
                /> 
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Enter Votre Date"
              value={date}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  helperText: 'MM/DD/YYYY',
                },
              }}
            />
          </LocalizationProvider>

            
            

            <label htmlFor="Condition Temporelle">Souffrez-vous des conditions suivantes ?</label>
                <select onChange={(e) => handleCheckboxChange(e.target.value)}>
                    <option>Aucune Condition</option>
                    <option value="cond1" selected={conditions.cond1}>cond1</option>
                    <option value="cond2" selected={conditions.cond2}>cond2</option>
                    <option value="cond3" selected={conditions.cond3}>cond3</option>
                    <option value="cond4" selected={conditions.cond4}>cond4</option>
                    <option value="cond5" selected={conditions.cond5}>cond5</option>
                    <option value="cond6" selected={conditions.cond6}>cond6</option>
                    <option value="cond7" selected={conditions.cond7}>cond7</option>
                </select>

                <button type="submit" onClick={save}>
                    Prendre rendez-vous
                </button>

        </form>
    </div>

  );
};

export default RendezVous;
