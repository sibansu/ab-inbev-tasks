import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import statesCitiesData from './statesCitiesData';

function EditFormNew() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [elements, setElements] = useState([]);
    const getCitiesByState = (state) => {
        const stateData = statesCitiesData.find((item) => item.state === state);
        return stateData ? stateData.cities : [];
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/get_users');
            setElements(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
    }, []);

    const elementToEdit = elements.find((element) => element.id === id);

    const formik = useFormik({
        initialValues: {
            fullName: elementToEdit ? elementToEdit.fullName : '',
            dob: elementToEdit ? elementToEdit.dob : '',
            email: elementToEdit ? elementToEdit.email : '',
            mobileNumber: elementToEdit ? elementToEdit.mobileNumber : '',
            roles: elementToEdit ? elementToEdit.roles.split(',').map((role) => role.trim()) : [],
            selectedState: elementToEdit ? elementToEdit.state : '',
            selectedCity: elementToEdit ? elementToEdit.city : '',
        },
        validationSchema: Yup.object({
            fullName: Yup.string().matches(/^[^0-9]+$/, 'Name should not contain numbers.').matches(/^[a-zA-Z\s]+$/, 'Name should not contain alphanumeric characters.').required('Fullname is required'),
            dob: Yup.date().required('Date of Birth is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            mobileNumber: Yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile number').required('Mobile Number is required'),
            roles: Yup.array().min(1, 'Select at least one role').required('Roles are required'),
            selectedState: Yup.string().required('State is required'),
            selectedCity: Yup.string().required('City is required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.put(`http://localhost:5000/update_user/${id}`, {
                    fullName: values.fullName,
                    dob: values.dob,
                    email: values.email,
                    mobileNumber: values.mobileNumber,
                    roles: values.roles,
                    state: values.selectedState,
                    city: values.selectedCity,
                });

                if (response.status === 200) {
                    const updatedElements = elements.map((element) =>
                        element.id === id
                            ? {
                                ...element,
                                fullName: values.fullName,
                                dob: values.dob,
                                email: values.email,
                                mobileNumber: values.mobileNumber,
                                roles: values.roles,
                                state: values.selectedState,
                                city: values.selectedCity,
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
        },
    });

    const handleStateChange = (state) => {
        formik.setValues({
            ...formik.values,
            selectedState: state,
            citiesInSelectedState: getCitiesByState(state),
            selectedCity: '',
        });
    };

    return (
        <div className="container mt-4">
            <h2>Edit User</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullname">Fullname</label>
                    <input
                        value={formik.values.fullName}  
                        type="text"
                        className="form-control"
                        id="fullname"
                        {...formik.getFieldProps('fullName')}
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                        <div className="text-danger">{formik.errors.fullName}</div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dob"
                        {...formik.getFieldProps('dob')}
                        max={new Date().toISOString().split('T')[0]}
                    />
                    {formik.touched.dob && formik.errors.dob && (
                        <div className="text-danger">{formik.errors.dob}</div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-danger">{formik.errors.email}</div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="mobileNumber"
                        {...formik.getFieldProps('mobileNumber')}
                        pattern="[0-9]{10}"
                    />
                    {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                        <div className="text-danger">{formik.errors.mobileNumber}</div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="roles">Roles</label>
                    <select
                        className="form-control"
                        id="roles"
                        multiple
                        {...formik.getFieldProps('roles')}
                    >
                        <option value="developer">Developer</option>
                        <option value="HR">HR</option>
                        <option value="manager">Manager</option>
                        <option value="designer">Designer</option>
                    </select>
                    {formik.touched.roles && formik.errors.roles && (
                        <div className="text-danger">{formik.errors.roles}</div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <select
                        className="form-control"
                        id="state"
                        {...formik.getFieldProps('selectedState')}
                        onChange={(e) => handleStateChange(e.target.value)}
                    >
                        <option value="">Select State</option>
                        {statesCitiesData.map((item) => (
                            <option key={item.state} value={item.state}>
                                {item.state}
                            </option>
                        ))}
                    </select>
                    {formik.touched.selectedState && formik.errors.selectedState && (
                        <div className="text-danger">{formik.errors.selectedState}</div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <select
                        className="form-control"
                        id="city"
                        {...formik.getFieldProps('selectedCity')}
                    >
                        <option value="">Select City</option>
                        {formik.values.citiesInSelectedState &&
                            formik.values.citiesInSelectedState.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                    </select>
                    {formik.touched.selectedCity && formik.errors.selectedCity && (
                        <div className="text-danger">{formik.errors.selectedCity}</div>
                    )}
                </div>

                <button type="submit" className="btn btn-success">
                    Update
                </button>
            </form>
        </div>
    );
}

export default EditFormNew;
