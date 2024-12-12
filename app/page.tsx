"use client";

import { ChangeEvent, SyntheticEvent, useState } from "react";

interface DataAndErrors {
    name: string;
    age: number | string;
    email: string;
    password: string;
}

export default function Home() {
    const [formData, setFormData] = useState<DataAndErrors>({
        name: '',
        age: 0,
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<DataAndErrors>({
        name: '',
        age: '',
        email: '',
        password: ''
    });

    const [submissionMessage, setSubmissionsMessage] = useState('');

    const validate = (): DataAndErrors => {
        const newErrors: DataAndErrors = {
            name: '',
            age: '',
            email: '',
            password: ''
        };

        if (!formData.name?.trim()) {
            newErrors.name = 'Name is required';
        }

        if (formData.age as number < Number(18)) {
            newErrors.age = "Must be at least 18 years of age"
        }

        if (!formData.email?.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }

        return newErrors;
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        
        const validationErrors = validate();

        if (
            validationErrors.name ||
            validationErrors.age ||
            validationErrors.email ||
            validationErrors.password
            
        ) {
            setErrors(validationErrors);
            setSubmissionsMessage("");
        } else {
            setErrors({
                name: '',
                age: '',
                email: '',
                password: ''
            });
            setSubmissionsMessage("Form submitted successfully.");
            setFormData({
                name: '',
                age: '',
                email: '',
                password: ''
            });
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p6">
            <form
                onSubmit={(event) => handleSubmit(event)}
                className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-5"
            >
                <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
                <div>
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-input ${
                            errors.name
                                ? "form-input-border-error"
                                : "form-border-input"
                        }`}
                    />
                    {errors.name && <p className="form-input-error">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="age" className="form-label">
                        Age
                    </label>
                    <input
                        type="number"
                        name="age"
                        id="age"
                        value={formData.age}
                        onChange={handleChange}
                        className={`form-input ${
                            errors.age
                                ? "form-input-border-error"
                                : "form-border-input"
                        }`}
                    />
                    {errors.age && <p className="form-input-error">{errors.age}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-input ${
                            errors.email
                                ? "form-input-border-error"
                                : "form-border-input"
                        }`}
                    />
                    {errors.email && <p className="form-input-error">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`form-input ${
                            errors.name
                                ? "form-input-border-error"
                                : "form-border-input"
                        }`}
                    />
                    {errors.password && <p className="form-input-error">{errors.password}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Submit
                </button>
                {submissionMessage && 
                    <p className="text-sm text-green-500">{submissionMessage}</p>
                }
            </form>
        </div>
    )
}