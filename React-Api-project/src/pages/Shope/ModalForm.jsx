import { useState } from "react";
import { useDispatch } from "react-redux";
import { postshopeData } from "../../store/poststore.js";
import { useNavigate } from "react-router-dom";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import PropTypes from "prop-types"; 

const AddProductForm = ({ handleClose }) => { 
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category_name: "",
    image_url: "",
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleSuccess = () => {
    console.log("success");
    setErrorMsg(null);
    handleClose(); 
    navigate("/shope"); 
  };

  const handleError = (error) => {
    console.log("error success", error);
    setErrorMsg(error.error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      postshopeData({
        data: productData,
        successCB: handleSuccess,
        errorCB: handleError,
      })
    );
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f8f9fa",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          padding: 4,
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Add New Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Category"
            name="category_name"
            value={productData.category_name}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Image URL"
            name="image_url"
            value={productData.image_url}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Add Product
          </Button>
          {errorMsg && (
            <Typography
              variant="body2"
              color="error"
              align="center"
              sx={{ mt: 2 }}
            >
              {errorMsg}
            </Typography>
          )}
          <Button
            onClick={handleClose} 
            color="secondary"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </form>
      </Box>
    </Container>
  );
};
AddProductForm.propTypes = {
    handleClose: PropTypes.func.isRequired, 
  };
export default AddProductForm;
