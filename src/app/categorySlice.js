import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    values: [1, 2, 3],
};
export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        newCategory: (state, action) => {
            state.values.push(action.payload);
            state.values.sort();
        },

        deleteCategory: (state, action) => {
            state.values = state.values.filter((value, index) => index !== action.payload);
        },

        editCategory: (state, action) => {
            state.values = state.values.map((value, id) => {
                if (id === action.payload.id) {
                    return action.payload.value;
                }
                return value;
            });
        },

        resetCategory: (state) => {
            state.values = initialState.values;
        },
    },
});
    
export default categorySlice.reducer;

export const { newCategory, deleteCategory, editCategory, resetCategory } = categorySlice.actions;