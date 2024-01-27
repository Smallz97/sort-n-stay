import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNewHotel } from '../app/hotelSlice';
import { Link } from 'react-router-dom';


const NewHotel = () => {
  const dispatch = useDispatch();
  const { values } = useSelector((state) => state.category);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');

  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    const fetchCountryList = async () => {
      // Fetch the list of countries from the API provided
    fetch('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json')
      .then((res) => res.json())
      .then((data) => {
        // Get all countries, and extract the country name
        let countries = data.map((country) => country.country);
        // Remove duplicates
        countries = [...new Set(countries)];
        // Set the state with the list of countries
        setCountryList(countries);
      });
    }
    fetchCountryList();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !description || !country || !address || !category) return alert('Please fill out all the fields');
    dispatch(
      createNewHotel({
        name,
        description,
        country,
        address,
        category,
      })
    );
    setAddress('');
    setCountry('');
    setDescription('');
    setName('');
    setCategory('');

    navigate('/hotels');
  };


  return (
    <div className='new-hotel'>
      <nav>
        <Link to="/" className="back-home">Back Home<span aria-hidden="true">→</span></Link>
      </nav>
      <div className="words">
        <h1>
          Sort-n-Stay
        </h1>
        <p>
          Please fill out the form below to add a new hotel / stay.
          Ensure that you fill out all the fields accurately.
          This will help us to serve you better.
        </p>
      </div>

      <form onSubmit={handleSubmit} className='flex-column gap-4 new-hotel-form'>
        <TextField
          id="outlined-basic"
          fullWidth
          label="Hotel Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          fullWidth
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            labelId="country-label"
            id="country"
            value={country}
            label="Address"
            fullWidth
            onChange={(e) => setCountry(e.target.value)}
            inputProps={{
              name: 'country',
            }}

          >
            <option aria-label="None" value="" />
            {countryList?.map((country, index) => (
              <MenuItem key={index} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          fullWidth
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="helper-label">Category</InputLabel>
          <Select
            labelId="helper-label"
            id="helper"
            value={category}
            label="Address"
            fullWidth
            onChange={(e) => setCategory(e.target.value)}
            inputProps={{
              name: 'category',
            }}

          >
            <option aria-label="None" value="" />
            {values?.map((category, index) => (
              <MenuItem key={index} value={category}>
              {"⭐ ".repeat(category)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <button type="submit" className='w-full'>Submit</button>
      </form>
    </div>
  );
};

export default NewHotel;
