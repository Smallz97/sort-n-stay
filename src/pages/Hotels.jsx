/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteHotel, editHotel } from "../app/hotelSlice";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";


const Hotels = () => {
    const { hotels } = useSelector((state) => state.hotel);
    const { values } = useSelector((state) => state.category);

    const [hotelsState, setHotelsState] = useState(hotels);

    const handleFilter = (f) => {
        setHotelsState(
            hotels.filter((hotel) => hotel.category === Number(f))
        )
    }
    return (
        <section>
            <nav>
                <Link to="/" className="back-home">Back Home<span aria-hidden="true">→</span></Link>
            </nav>
            <p>Filter by categories:</p>
            <FormControl>
                <InputLabel id="helper-label">Filter</InputLabel>
                <Select
                    labelId="helper-label"
                    id="helper"
                    label="Filter"
                    value={""}
                    placeholder="Filter by category"
                    onChange={(e) => handleFilter(e.target.value)}
                    inputProps={{
                        name: 'filter',
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
            {hotelsState?.map((hotel, index) => (
                <HotelCard key={index} hotel={hotel} index={index} />
            ))}

            {!hotelsState.length && (
                <article className="no-hotels">
                    <h2>No hotels found</h2>
                    <p>
                        Create a new hotel{" "}
                        <Link to="/create-new-hotel">here<span aria-hidden="true">→</span></Link>
                    </p>
                </article>
            )}
        </section>
    );
};

export default Hotels;

//recieve a hotel object as a prop, and render the hotel details, can delete the hotel, and can edit the hotel
const HotelCard = ({ hotel, index }) => {
    const dispatch = useDispatch();

    const { values } = useSelector((state) => state.category);
    const [name, setName] = useState(hotel.name);
    const [description, setDescription] = useState(hotel.description);
    const [country, setCountry] = useState(hotel.country);
    const [address, setAddress] = useState(hotel.address);
    const [category, setCategory] = useState(hotel.category);

    const [isEditing, setIsEditing] = useState(false);

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
        };
        fetchCountryList();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !description || !country || !address || !category) return alert('Please fill out all the fields');
        dispatch(
            editHotel({
                id: index,
                value: {
                    name,
                    description,
                    country,
                    address,
                    category,
                }
            })
        );
        setIsEditing(false);
        window.location.reload();
    };

    const handleDelete = () => {
        dispatch(deleteHotel(index));
        window.location.reload();
    };

    return (
        <div className='hotel-card new-hotel-form'>
            <h2>{hotel.name}</h2>
            <p>{hotel.description}</p>
            <p>{hotel.address}</p>
            <p>{hotel.country}</p>
            <p>{"⭐ ".repeat(hotel.category)}</p>
            <div className="flex-row gap-4">
                <div className="pointer flex-row gap-2" onClick={handleDelete}>Delete{" "}<DeleteIcon /></div>
                <div className="pointer flex-row gap-2" onClick={() => setIsEditing(true)}>Edit{" "}<EditIcon /></div>
            </div>

            {
                isEditing && (
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
                        <button onClick={() => setIsEditing(false)} className='w-full'>Cancel</button>
                    </form>
                )
            }
        </div>
    );
};


export const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
);

export const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 5-3-3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" /><path d="M8 18h1" /><path d="M18.4 9.6a2 2 0 1 1 3 3L17 17l-4 1 1-4Z" /></svg>
);