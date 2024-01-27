import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DeleteIcon, EditIcon } from "./Hotels";
import TextField from '@mui/material/TextField';
import { deleteCategory, editCategory, newCategory } from "../app/categorySlice";
import { useState } from "react";

const EditCategories = () => {
  const { values } = useSelector((state) => state.category);
  return (
    <div>
      <nav>
        <Link to="/" className="back-home">Back Home<span aria-hidden="true">→</span></Link>
      </nav>
      <section>
        <h2>Add new Category</h2>
        <AddCategory />

        <h2>Current categories</h2>
        <div className="cat-wrap">
        {values.map((category, index) => (
          <CategoryCard key={index} category={category} index={index} />
          ))}
        </div>
        
      </section>
    </div>
  );
};

export default EditCategories;

const AddCategory = () => { 
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(newCategory(Number(category)));
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className='flex-column gap-4 new-hotel-form'>
      <TextField
        id="outlined-basic"
        fullWidth
        label="Category"
        variant="outlined"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button type="submit" className='w-full'>Submit</button>
    </form>
  );

}


// eslint-disable-next-line react/prop-types
const CategoryCard = ({ category, index }) => {

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteCategory(index));
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editCategory({ id: index, value: categoryVal }));
    setIsEditing(false);
    window.location.reload();
  }

  const [isEditing, setIsEditing] = useState(false);
  const [categoryVal, setCategory] = useState(category);


  return (
    <div className="category-card">
      <p className="star">{"⭐ ".repeat(category)}</p>
      <div className="pointer flex-row gap-2" onClick={handleDelete}>Delete Category{" "}<DeleteIcon /></div>
      <div className="pointer flex-row gap-2" onClick={() => setIsEditing(true)}>Edit{" "}<EditIcon /></div>

      {
        isEditing && (
          <form onSubmit={handleSubmit} className='flex-column gap-4 new-hotel-form'>
            <TextField
              id="outlined-basic"
              fullWidth
              label="Category"
              variant="outlined"
              value={categoryVal}
              onChange={(e) => setCategory(e.target.value)}
            />

            <button type="submit" className='w-full'>Submit</button>
            <button onClick={() => setIsEditing(false)} className='w-full'>Cancel</button>
          </form>
        )
      }
    </div>
  );
};