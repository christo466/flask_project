import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getshopeData } from "../../store/shope.js";
import { useNavigate } from "react-router-dom";
import Form from "./ModalForm.jsx";
import Box from "@mui/material/Box";
import Header from "../../components/Header.jsx";
import Footer from "../../components/index.jsx";
import Modal from "@mui/material/Modal";
import "./Shope.css";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Shope = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shopeData = useSelector((state) => state.shope.data);
  const isLoading = useSelector((state) => state.shope.status);

  const [displayedData, setDisplayedData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getshopeData());
  }, [dispatch]);

  useEffect(() => {
    if (shopeData.length > 0) {
      const initialData = shopeData.slice(0, 10);
      setDisplayedData(initialData);
      setCurrentIndex(10);
    }
  }, [shopeData]);

  const goToForm = () => {
    navigate("/Form");
  };

  const goToHome = () => {
    navigate("/");
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const addNextData = () => {
    if (currentIndex < shopeData.length) {
      setDisplayedData((prevData) => [...prevData, shopeData[currentIndex]]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleRefresh();
  };

  return (
    
    <div className="dashboard-container">
      {isLoading === "pending" ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="Header">
            <Header />
          </div>
          <h1 className="dashboard-title">SHOPE DATA</h1>
          <div className="button-container">
            <Button
              variant="contained"
              color="secondary"
              onClick={goToForm}
              className="navigate-button"
              style={{ marginBottom: "16px" }}
            >
              Form
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
              className="add-button"
              sx={{ ml: 2 }}
              style={{ marginBottom: "16px" }}
            >
              Add Product
            </Button>
          </div>
          <TableContainer component={Paper} className="table-container">
            <Table aria-label="people table">
              <TableHead className="table-head">
                <TableRow>
                  <TableCell>SL NO</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Image</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedData.map((data, index) => (
                  <TableRow key={data.id} className="table-row">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{data.category}</TableCell>
                    <TableCell>{data.product}</TableCell>
                    <TableCell>{data.price}</TableCell>
                    <TableCell>
                      <img
                        src={data.image_url}
                        alt={`Product ${data.product}`}
                        style={{ width: "100px", height: "auto" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="button-container">
            <Button onClick={goToHome} className="navigate-button">
              Home
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={addNextData}
              className="load-next-button"
              disabled={currentIndex >= shopeData.length}
            >
              Load Next
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRefresh}
            >
              Refresh Page
            </Button>
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box sx={style}>
              <Form handleClose={handleClose} />
            </Box>
          </Modal>
        </>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Shope;
