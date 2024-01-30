import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import statesCitiesData from './statesCitiesData';

function AddRow({ elements, setElements }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        dob: '',
        email: '',
        mobileNumber: '',
        roles: [],
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

    const handleAdd = () => {
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

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address.');
            return;
        }

        const newElement = {
            id: elements.length + 1,
            fullName: formData.fullName,
            dob: formData.dob,
            email: formData.email,
            mobileNumber: formData.mobileNumber,
            roles: formData.roles,
            state: formData.selectedState,
            city: formData.selectedCity,
        };

        setElements([...elements, newElement]);
        navigate('/');
        toast.success('Successfully added a new row!');
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
                <label htmlFor="roles">Roles</label>
                <select
                    className="form-control"
                    id="roles"
                    multiple
                    value={formData.roles}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            roles: Array.from(e.target.selectedOptions, (option) => option.value),
                        })
                    }
                >
                    <option value="developer">developer</option>
                    <option value="HR">HR</option>
                    <option value="manager">manager</option>
                    <option value="designer">designer</option>
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