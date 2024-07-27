import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteCafeApi } from "../../api/cafesApi";
import { fetchCafes } from "../../redux/cafesSlice";
import { Link } from "react-router-dom";

// this is for edit and delete button for each row
function LinkPresenter(props) {
  const noOfEmployees = props.data.employees;
  return (
    <Link to={`/employees?cafe_id=${props.data.cafe_id}`}>
      {noOfEmployees + " people"}
    </Link>
  );
}

const ActionButtonGroup = (props) => {
  const navigate = useNavigate();

  const [deleting, setDeleting] = useState(false);

  const handleEditButton = () => {
    const cafeIdToEdit = props.data.cafe_id;
    navigate(`/edit-cafe?${cafeIdToEdit}`, { state: props.data });
  };

  const dispatch = useDispatch();

  const handleDeleteButton = async () => {
    setDeleting(true);
    const cafeIdToDelete = props.data.cafe_id;
    if (
      window.confirm(
        "This action will delete the cafe and all its employees. Are you sure you want to proceed ?"
      )
    ) {
      try {
        await deleteCafeApi(cafeIdToDelete);
        dispatch(fetchCafes());
      } catch (error) {
        console.error("Encountered an error while trying to delete a cafe: ", error);
        throw error;
      }
    }
    setDeleting(false);
  };

  return (
    <div>
      {/* edit button */}
      <Button
        size="small"
        variant="contained"
        onClick={handleEditButton}
        style={{ marginLeft: "10px", marginRight: "20px" }}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
      {/* delete button */}
      <Button
        size="small"
        variant="outlined"
        onClick={handleDeleteButton}
        color="error"
        startIcon={<DeleteIcon />}
        disabled={deleting}
      >
        Delete
      </Button>
    </div>
  );
};

const columnDefinitions = [
  {
    headerName: "Cafe Name",
    field: "cafe_name",
    filter: "agTextColumnFilter",
    sortable: true,
    resizable: true,
    width: "130px",
  },
  {
    headerName: "Cafe Description",
    field: "description",
    resizable: true,
    width: "310px",
  },
  {
    headerName: "Employees",
    field: "employees",
    cellRenderer: LinkPresenter,
    sortable: true,
    resizable: true,
    width: "105px",
  },

  {
    headerName: "Location",
    field: "location",
    filter: "agTextColumnFilter",
    sortable: true,
    resizable: true,
    width: "120px",
  },

  {
    headerName: "Actions",
    cellRenderer: ActionButtonGroup,
    colId: "actions",
    width: "230px",
  },
];

export default function CafeListContainer() {

  const navigate = useNavigate();

  const handleAddCafe = () => {
    navigate("/edit-cafe");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCafes());
  }, [dispatch]);

  const rowData = useSelector((state) => state.cafes);

  return (
    <div className="table-container">
      <div
        className="ag-theme-alpine with-shadow"
        style={{
          height: "330px",
          width: "63%",
          margin: "auto",
          backgroundColor: "#c6ebab",
        }}
      >
        <AgGridReact
          columnDefs={columnDefinitions}
          rowData={rowData}
          animateRows={true}
          cellRenderer={ActionButtonGroup}
          sizeColumnsToFit={true}
          suppressRowClickSelection={false}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
      >
        <Button size="large" variant="contained" onClick={handleAddCafe}>
          Add New Cafe
        </Button>
      </div>
    </div>
  );
}
