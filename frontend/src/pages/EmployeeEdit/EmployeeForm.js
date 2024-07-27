import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { addEmployeeApi, editEmployeeApi } from "../../api/employeesApi";
import { fetchEmployees } from "../../redux/employeesSlice";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Cancel from "@mui/icons-material/Cancel";
import { Select, MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { fetchCafes } from "../../redux/cafesSlice";
import { useSelector } from "react-redux";

export default function EmployeeForm() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cafes = useSelector((state) => state.cafes);
  if (!cafes) {
    dispatch(fetchCafes());
  }

  const [editSuccess, setEditSuccess] = useState("");
  const [editError, setEditError] = useState("");

  const editEmployee = location.state;

  const [name, setName] = useState(editEmployee?.name || "");
  const [nameError, setNameError] = useState("");

  const [phone, setPhone] = useState(editEmployee?.phone || "");
  const [phoneError, setPhoneError] = useState("");

  const [email, setEmail] = useState(editEmployee?.email || "");
  const [emailError, setEmailError] = useState("");

  const [saving, setSaving] = useState(false);
  const [selectedCafeId, setSelectedCafeId] = useState(
    editEmployee?.cafe_id || ""
  );

  const [gender, setGender] = useState(editEmployee?.gender || "Male");

  const [selectedDate, setSelectedDate] = useState(
    dayjs(editEmployee?.join_date) || dayjs()
  );
  const handleDateChange = (newDate) => {
    const today = dayjs();
    if (newDate > today) {
      setSelectedDate(today);
    } else {
      setSelectedDate(newDate);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    var validationError = false;

    if (!name) {
      validationError = true;
      setNameError("Please enter employee name.");
    } else {
      if (name.length < 6 || name.length > 10) {
        validationError = true;
        setNameError("Please enter a name that is 6 to 10 characters long.");
      }
    }

    if (!phone) {
      validationError = true;
      setPhoneError("Please enter phone number.");
    } else {
      const phoneRegex = /^[89]\d{7}$/;
      if (!phoneRegex.test(phone)) {
        validationError = true;
        setPhoneError(
          "Please enter a valid Singapore phone number(starts with 8, or 9 and have 8 digits)."
        );
      }
    }

    if (!email) {
      validationError = true;
      setEmailError("Please enter email address.");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        validationError = true;
        setEmailError("Please enter valid email address.");
      }
    }

    if (validationError) {
      setSaving(false);
      return;
    }

    try {
      if (editEmployee) {
        await editEmployeeApi({
          employee_id: editEmployee.employee_id,
          name,
          gender,
          email,
          phone,
          selectedDate: selectedDate.format("YYYY-MM-DD"),
          selectedCafeId,
        });
      } else {
        await addEmployeeApi({
          name,
          gender,
          email,
          phone,
          selectedDate: selectedDate.format("YYYY-MM-DD"),
          selectedCafeId,
        });
      }
      dispatch(fetchEmployees());
      setName("");
      setPhone("");
      setEmail("");
      setGender("Male");
      setSelectedCafeId("");
      setSelectedDate(dayjs());
      setEditSuccess("Employee saved successfully. You will be redirected shortly.");
      setTimeout(() => {
        navigate("/employees");
      }, 1500);
    } catch (error) {
      setEditError(error.message + ". " + error?.response?.data);
      setTimeout(() => {
        setEditError("");
      }, 3000);
    }
    setSaving(false);
  };

  return (
    <Container maxWidth="md">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={editSuccess}
      >
        <Alert severity="success">Save successfuly done</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={editError}
      >
        <Alert severity="error">{editError}</Alert>
      </Snackbar>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="name"
              name="name"
              label="Name"
              value={name}
              fullWidth
              autoComplete="name"
              variant="standard"
              onChange={(event) => {
                setName(event.target.value);
              }}
              error={nameError.length > 0}
              helperText={nameError}
              onFocus={() => setNameError("")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Phone number"
              value={phone}
              fullWidth
              autoComplete="phone-number"
              variant="standard"
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              error={phoneError.length > 0}
              helperText={phoneError}
              onFocus={() => setPhoneError("")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email address"
              value={email}
              fullWidth
              autoComplete="email"
              variant="standard"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              error={emailError.length > 0}
              helperText={emailError}
              onFocus={() => setEmailError("")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-standard-label">
                Cafe
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectedCafeId}
                onChange={(event) => {
                  setSelectedCafeId(event.target.value);
                }}
                label="Cafe Name"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {cafes &&
                  cafes.map((cafe) => (
                    <MenuItem key={cafe?.cafe_name} value={cafe?.cafe_id}>
                      {cafe?.cafe_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" fullWidth>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Gender *
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={gender}
                onChange={(event) => {
                  setGender(event.target.value);
                }}
              >
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Join Date *"
                  value={selectedDate}
                  component={["DatePicker"]}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <LoadingButton
            type="submit"
            loading={saving}
            fullWidth
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{ mt: 3, mb: 2 }}
            style={{ marginLeft: "24px", marginTop: "40px" }}
          >
            Save
          </LoadingButton>
          <LoadingButton
            fullWidth
            variant="contained"
            startIcon={<Cancel />}
            sx={{ mt: 3, mb: 2 }}
            style={{ marginLeft: "24px", marginTop: "5px" }}
            color="error"
            onClick={() => navigate("/employees")}
          >
            Cancel
          </LoadingButton>
        </Grid>
      </Box>
    </Container>
  );
}
