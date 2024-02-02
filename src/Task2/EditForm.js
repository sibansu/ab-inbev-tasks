import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

import statesCitiesData from './statesCitiesData';

function EditForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [elements, setElements] = useState([]); 

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

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get_users');
                setElements(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const elementToEdit = elements.find((element) => element.id === id);
        if (elementToEdit) {
            setFormData({
                id: elementToEdit.id,
                fullName: elementToEdit.fullName,
                dob: elementToEdit.dob,
                email: elementToEdit.email,
                mobileNumber: elementToEdit.mobileNumber,
                roles: elementToEdit.roles.split(',').map(role => role.trim()),
                selectedState: elementToEdit.state,
                selectedCity: elementToEdit.city,
                citiesInSelectedState: getCitiesByState(elementToEdit.state),
            });
        }
    }, [elements, id]);

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

    const handleUpdate = async () => {
        if (!formData.dob || !formData.email || !formData.fullName || !formData.mobileNumber || !formData.roles || !formData.selectedCity || !formData.selectedState) {
            toast.error("All fields required")
            return;
        }
        if (!formData.roles || formData.roles.length === 0) {
            toast.error("Please select at least one role");
            return;
        }
        const mobileNumberRegex = /^[0-9]{10}$/;
        if (!mobileNumberRegex.test(formData.mobileNumber)) {
            toast.error('Please enter a valid 10-digit mobile number.');
            return;
        }

        const nameRegex = /^[^0-9]+$/;
        if (!nameRegex.test(formData.fullName)) {
            toast.error('Name should not contain numbers.');
            return;
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address.');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5000/update_user/${id}`, {
                fullName: formData.fullName,
                dob: formData.dob,
                email: formData.email,
                mobileNumber: formData.mobileNumber,
                roles: formData.roles,
                state: formData.selectedState,
                city: formData.selectedCity,
            });

            if (response.status === 200) {
                const updatedElements = elements.map((element) =>
                    element.id === id
                        ? {
                            ...element,
                            fullName: formData.fullName,
                            dob: formData.dob,
                            email: formData.email,
                            mobileNumber: formData.mobileNumber,
                            roles: formData.roles,
                            state: formData.selectedState,
                            city: formData.selectedCity,
                        }
                        : element
                );

                setElements(updatedElements);
                navigate('/');
                toast.success('Successfully updated row!');
            } else {
                toast.error('Failed to update row.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while updating the row.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Edit User</h2>
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
            <button onClick={handleUpdate} className="btn btn-success">
                Update
            </button>
        </div>
    );
}

export default EditForm;