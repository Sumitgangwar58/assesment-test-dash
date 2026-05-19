import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClient } from "../../redux/action/user";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { CFormSelect } from "@coreui/react";
import { pakistanCities } from "../../constant";
import { updateUser } from "../../redux/action/user";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateClientModal = ({ open, setOpen, scroll, mode, defaultValues }) => {
  //////////////////////////////////////// VARIABLES /////////////////////////////////////
  const [errors, setErrors] = useState({});
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const initialEmployeeState = {
    firstName: defaultValues?.firstName || "",
    lastName: defaultValues?.lastName || "",
    username: defaultValues?.username || "",
    phone: defaultValues?.phone || "",
    email: defaultValues?.email || "",
  };

  //////////////////////////////////////// STATES /////////////////////////////////////
  const [employeeData, setEmployeeData] = useState(initialEmployeeState);

  //////////////////////////////////////// USE EFFECTS /////////////////////////////////////

  //////////////////////////////////////// FUNCTIONS /////////////////////////////////////

  const validate = () => {
    const newErrors = {};

    if (!employeeData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }

    if (!employeeData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    if (!employeeData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!employeeData.email.trim()) {
      newErrors.email = "Password is required";
    }

    if (!employeeData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (mode === "edit") {
      dispatch(
        updateUser(defaultValues._id, employeeData, defaultValues?.role),
      );
    } else dispatch(createClient(employeeData));
    setEmployeeData(initialEmployeeState);
    setErrors({});
    setOpen(false);
  };

  const handleChange = (field, value) => {
    setEmployeeData((prevFilters) => ({ ...prevFilters, [field]: value }));
    if (value) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({});
    setEmployeeData(initialEmployeeState);
  };

  return (
    <div>
      <Dialog
        scroll={scroll}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Add New Client</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Client Details</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">First Name </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={employeeData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Last Name </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={employeeData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">User Name </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={employeeData.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    error={!!errors.username}
                    helperText={errors.username}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Email </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={employeeData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Phone </td>
                <td className="pb-4">
                  <TextField
                    type="number"
                    size="small"
                    value={employeeData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                </td>
              </tr>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            variant="contained"
            type="reset"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin"
          >
            {isFetching ? "Submitting..." : "Submit"}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateClientModal;
