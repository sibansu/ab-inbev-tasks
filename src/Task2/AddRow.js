import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import statesCitiesData from './statesCitiesData';
import axios from 'axios'
function AddRow() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        dob: '',
        email: '',
        mobileNumber: '',
        roles: '',
        selectedState: '',
        selectedCity: '',
        citiesInSelectedState: [],
    });

    const getCitiesByState = (state) => {
        const stateData = statesCitiesData.find((item) => item.state === state);
        return stateData ? stateData.cities : [];
    };

    const handleStateChange = (state) => {
        setFormData({
            ...formData,
            selectedState: state,
            citiesInSelectedState: getCitiesByState(state),
            selectedCity: '',
        });
    };

    const handleAdd = async () => {
        if (
            !formData.dob ||
            !formData.email ||
            !formData.fullName ||
            !formData.mobileNumber ||
            !formData.roles ||
            !formData.selectedCity ||
            !formData.selectedState
        ) {
            toast.error('All fields are required');
            return;
        }

        const mobileNumberRegex = /^[0-9]{10}$/;
        if (!mobileNumberRegex.test(formData.mobileNumber)) {
            toast.error('Please enter a valid 10-digit mobile number.');
            return;
        }
        const fullNameRegex = /^[a-zA-Z\s]+$/;
        if (!fullNameRegex.test(formData.fullName)) {
            toast.error('Full name should only contain alphabetic characters and white spaces.');
            return;
        }
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address.');
            return;
        }
        console.log(formData);
        try {
            const response = await axios.post('http://127.0.0.1:5000/add_user', {
                fullName: formData.fullName,
                dob: formData.dob,
                email: formData.email,
                mobileNumber: formData.mobileNumber,
                roles: formData.roles,
                state: formData.selectedState,
                city: formData.selectedCity,
            });

            if (response.status === 201) {
                // const newElement = response.data;
                // setElements([...elements, newElement]);  // Update the state with the new element
                console.log(response.data);
                navigate('/');
                toast.success('Successfully added a new row!');
            } else {
                console.log(response.data);
                toast.error(response.data.error || 'Failed to add a new row.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while adding a new row.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add Row</h2>
            <div className="form-group">
                <label htmlFor="fullname">Fullname</label>
                <input
                    type="text"
                    className="form-control"
                    id="fullname"
                    value={formData.fullName}
                    maxLength='30'
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                    type="date"
                    className="form-control"
                    id="dob"
                    value={formData.dob}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    maxLength='30'
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input
                    type="tel"
                    className="form-control"
                    id="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    pattern="[0-9]{10}"
                />
            </div>

            <div className="form-group">
                <label>Roles</label>
                <select
                    multiple
                    className="form-control"
                    value={formData.roles.split(',')}
                    onChange={(e) => {
                        const selectedRoles = Array.from(e.target.selectedOptions, option => option.value);
                        setFormData({ ...formData, roles: selectedRoles.join(',') });
                    }}
                >
                    <option value="developer">Developer</option>
                    <option value="HR">HR</option>
                    <option value="manager">Manager</option>
                    <option value="designer">Designer</option>
                </select>
            </div>



            <div className="form-group">
                <label htmlFor="state">State</label>
                <select
                    className="form-control"
                    id="state"
                    value={formData.selectedState}
                    onChange={(e) => handleStateChange(e.target.value)}
                >
                    <option value="">Select State</option>
                    {statesCitiesData.map((item) => (
                        <option key={item.state} value={item.state}>
                            {item.state}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="city">City</label>
                <select
                    className="form-control"
                    id="city"
                    value={formData.selectedCity}
                    onChange={(e) => setFormData({ ...formData, selectedCity: e.target.value })}
                >
                    <option value="">Select City</option>
                    {formData.citiesInSelectedState.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={handleAdd} className="btn btn-primary">
                Add Row
            </button>
        </div>
    );
}

export default AddRow;
