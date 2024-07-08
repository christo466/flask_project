import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPeopleData } from "../../store/people.js";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header.jsx";
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
import "./Dashboard.css";


const Dashboard = () => {
  const dispatch = useDispatch();

  const peopleData = useSelector((state) => state.people.data);
  const isLoading = useSelector((state) => state.people.status);

  const [displayedData, setDisplayedData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(getPeopleData());
  }, [dispatch]);

  useEffect(() => {
    if (peopleData.length > 0) {
      const initialData = peopleData.slice(0, 3);
      setDisplayedData(initialData);
      setCurrentIndex(3);
    }
  }, [peopleData]);

  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };
  const addNextData = () => {
    if (currentIndex < peopleData.length) {
      setDisplayedData((prevData) => [...prevData, peopleData[currentIndex]]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="dashboard-container">
      {isLoading === "pending" ? (
        <div>Loading...</div>
      ) : (
        <>
        <Header/>
          <h1 className="dashboard-title">PEOPLE DATA</h1>
          <TableContainer component={Paper} className="table-container">
            <Table aria-label="people table">
              <TableHead className="table-head">
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedData.map((person) => (
                  <TableRow key={person.id} className="table-row">
                    <TableCell>{person.id}</TableCell>
                    <TableCell>{person.name}</TableCell>
                    <TableCell>{person.username}</TableCell>
                    <TableCell>{person.email}</TableCell>
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
              disabled={currentIndex >= peopleData.length}
            >
              Load Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
