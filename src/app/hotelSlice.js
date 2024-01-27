import { createSlice } from '@reduxjs/toolkit';

export const hotelSlice = createSlice({
    name: 'hotel',
    initialState: {
        hotels: [],
        filteredHotels: [],
    },
    reducers: {
        createNewHotel: (state, action) => {
            state.hotels.push(action.payload);
        },
        deleteHotel: (state, action) => {
            //action is the id of the hotel, its position in the array, not the object itself, I'm using that to filter the array
            state.hotels = state.hotels.filter((hotel, index) => index !== action.payload);
        },
        editHotel: (state, action) => {
            //action is an object with the id of the hotel and the new value
            state.hotels = state.hotels.map((hotel, index) => {
                if (index === action.payload.id) {
                    return action.payload.value;
                }
                return hotel;
            });
        },

        clearHotels: (state) => {
            state.hotels = [];
        }
    },
});

export default hotelSlice.reducer;

export const { createNewHotel, deleteHotel, editHotel, clearHotels } = hotelSlice.actions;
