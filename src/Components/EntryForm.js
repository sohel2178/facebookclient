import React, { useState, useEffect } from 'react'
import { Modal } from "@mui/material"
import {TextField,MenuItem,InputLabel,FormControl,Select} from '@mui/material';
import {DatePicker} from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/joy/Box';





const EntryForm = ({ open, handleClose, saveUser,selectedUser,updateUser }) => {

  const VEHICLE_TYPE = ["BUS","BIKE","TRACK","CNG","EASY BIKE","COVERED VAN","LAUNCH","CAR"]
  const STATUS = ["RUNNING","CANCEL","PENDING"]
  const [user, setUser] = useState({
      name: "",
      phone_number: "",
      district: "",
      location: "",
      insert_date: null,
      probability_installation_date: null,
      price:0,
      service_charge:0,
      vehicle_type: "",
      customer_feedback: "",
      install_status:""
})
  useEffect(()=>{
    setUser({...selectedUser})
  },[selectedUser])


  const handleInput = (e) => {
    console.log(e.target.value)
      setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onVehicleTypeChange=(e)=>{
    // console.log(e.target.value)
    setUser(old=>({...old,vehicle_type:e.target.value}))
  }

  const onStatusChange = e=>{
    setUser(old=>({...old,install_status:e.target.value}))
  }

  const handleSubmit = (e) => {
      e.preventDefault();

      if(selectedUser){
        updateUser(user)
      }else{
        saveUser(user)
      }
  }
  return (
    <Modal
      data-aos="fade-up"
      open={open}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box className="entry">
        <div>
          <div className="centerdiv">
            <h3
              style={{
                textAlign: "center",
                width: "570px",
                position: "fixed",
                border: "none",
              }}
            >
              {selectedUser
                ? "Updade Client Information"
                : "ADD Client Information"}
            </h3>
            <div>
              <form className="centerdiv2" onSubmit={handleSubmit}>
                <TextField
                  className="textfield"
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleInput}
                  autoComplete="off"
                  label="customer_name"
                />
                <TextField
                  className="textfield"
                  type="number"
                  name="phone_number"
                  value={user.phone_number}
                  onChange={handleInput}
                  autoComplete="off"
                  label="phone_number"
                  style={{ marginTop: 25 }}
                />
                <TextField
                  className="textfield"
                  type="text"
                  name="district"
                  value={user.district}
                  onChange={handleInput}
                  autoComplete="off"
                  label="District"
                  style={{ marginTop: 25 }}
                />
                <TextField
                  className="textfield"
                  type="text"
                  name="location"
                  value={user.location}
                  onChange={handleInput}
                  autoComplete="off"
                  label="location"
                  style={{ marginTop: 25 }}
                />
                <TextField
                  className="textfield"
                  type="number"
                  name="price"
                  value={user.price}
                  onChange={handleInput}
                  autoComplete="off"
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                  style={{ marginTop: 25, width: 275 }}
                />
                <TextField
                  className="textfield"
                  type="number"
                  name="service_charge"
                  value={user.service_charge}
                  onChange={handleInput}
                  autoComplete="off"
                  label="Service_chagre"
                  variant="outlined"
                  style={{ marginTop: 25, marginLeft: 7, width: 275 }}
                />
                <div>
                  <LocalizationProvider  dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Insert Date"
                      value={user.insert_date}
                      onChange={(newValue) => {
                        setUser(old=>({...old,insert_date:newValue}))
                      }}
                      renderInput={(params) => <TextField style={{marginTop:25}} fullWidth {...params} />}
                    />
                  </LocalizationProvider>
                </div>
                <div>

                <LocalizationProvider  dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Probable Date of Installation"
                      value={user.probability_installation_date}
                      onChange={(newValue) => {
                        setUser(old=>({...old,probability_installation_date:newValue}))
                      }}
                      renderInput={(params) => <TextField style={{marginTop:25}} fullWidth {...params} />}
                    />
                  </LocalizationProvider>
  
                </div>

                <FormControl fullWidth style={{marginTop:25}}>
                  <InputLabel id="demo-simple-select-label">Vehicle Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={user.vehicle_type}
                    label="Age"
                    onChange={onVehicleTypeChange}
                  >
                    {VEHICLE_TYPE.map((x,i)=><MenuItem key={i} value={x}>{x}</MenuItem>)}
                  </Select>
                </FormControl>
                <TextField
                  className="textfield"
                  type="text"
                  name="customer_feedback"
                  value={user.customer_feedback}
                  onChange={handleInput}
                  autoComplete="off"
                  label="feedback"
                  style={{ marginTop: 10 }}
                />

<FormControl fullWidth style={{marginTop:25}}>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={user.install_status}
                    label="Status"
                    onChange={onStatusChange}
                  >
                    {STATUS.map((x,i)=><MenuItem key={i} value={x}>{x}</MenuItem>)}
                  </Select>
                </FormControl>
               
              </form>
              <div
                style={{
                  height: "50px",
                  width: "100%",
                  marginTop: "15px",
                  position: "fixed",
                }}
              >
                <button
                  className="button"
                  style={{ cursor: "pointer" }}
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="button"
                  style={{ cursor: "pointer" }}
                  onClick={handleSubmit}
                >
                  {selectedUser ? "Update" : "Send"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default EntryForm