// RegistrationForm.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFirstName, setLastName, setEmail, setPassword, setConfirmPassword, setUsers } from '../../actions/action';
import * as Yup from 'yup';
import CryptoJS from 'crypto-js';
import '../../styles/Registration.css'


const RegistrationForm = () => {
    const [errors, setErrors] = useState({
        userFirstName: null,
        userLastName: null,
        userEmail: null,
        password: null,
        confirmPassword: null,
    });

    const userFirstName = useSelector((state) => state.userFirstName);
    const userLastName = useSelector((state) => state.userLastName);
    const userEmail = useSelector((state) => state.userEmail);
    const password = useSelector((state) => state.password);
    const confirmPassword = useSelector((state) => state.confirmPassword);
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        const schema = Yup.object().shape({
            userFirstName: Yup.string().min(3).max(25).required(' '),
            userLastName: Yup.string().min(3).max(25).required(' '),
            userEmail: Yup.string().email('Invalid email format').required(' '),
            password: Yup.string().min(8).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/, 'Invalid password format').required(' '),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match'),
        });

        const validate = async () => {
            try {
                await schema.validate({
                    userFirstName,
                    userLastName,
                    userEmail,
                    password,
                    confirmPassword,
                }, { abortEarly: false });

                setErrors({
                    userFirstName: null,
                    userLastName: null,
                    userEmail: null,
                    password: null,
                    confirmPassword: null,
                });

            } catch (validationErrors) {
                const newErrors = {};
                validationErrors.inner.forEach((error) => {
                    newErrors[error.path] = error.message;
                });
                setErrors(newErrors);
            }
        };

        validate();

    }, [userFirstName, userLastName, userEmail, password, confirmPassword]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'userFirstName':
                dispatch(setFirstName(value))
                break;
            case 'userLastName':
                dispatch(setLastName(value))
                break;
            case 'userEmail':
                dispatch(setEmail(value))
                break;
            case 'password':
                dispatch(setPassword(value))
                break;
            case 'confirmPassword':
                dispatch(setConfirmPassword(value))
                break;
            default:
                break;
        }
    };

    const register = () => {

        const encodedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

        const newUser = {
            userFirstName: userFirstName,
            userLastName: userLastName,
            userEmail: userEmail,
            password: encodedPassword,
        }
        if (Object.values(errors).every((e) => e === null)) {
            dispatch(setUsers(newUser));
        }
    }
    const login = () => {
        navigate('/log-in');

    }

    return (
        <div className="registration-field">
            <div className="registration-form">

            <div className="registration-title">
                    Sign In
                </div>

                <div className="registration-input-box">


                            <span className={`input-description `}>
                            First name:
                            </span>

                            <input className={`input-field ${isErrorStyle('errorEmail')}`} type="text" name="userFirstName" value={userFirstName} onChange={handleInputChange} />
                        
                            <span className="error-message">
                                {errors.userFirstName}
                            </span>

                    <div className="input-field">
                        {errors.userLastName}
                        Last Name:
                        <input type="text" name="userLastName" value={userLastName} onChange={handleInputChange} />
                    </div>
                    <div className="input-field email">
                        {errors.userEmail}
                        Email:
                        <input type="text" name="userEmail" value={userEmail} onChange={handleInputChange} />
                    </div>
                    <div className="input-field password">
                        {errors.password}
                        Password:
                        <input type="password" name="password" value={password} onChange={handleInputChange} />
                    </div>
                    <div className="input-field password">
                        {errors.confirmPassword}
                        Confirm Password:
                        <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleInputChange} />
                    </div>
                </div>

                <div className="registr-button" >
                    <button name="register" disabled={!(Object.values(errors).every((e) => e === null))} onClick={register}>Register</button>
                </div>
                <div>
                    <button name='login' onClick={login} >LogIn</button>
                </div>

                <div className="users-table">

                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u, index) => (
                                <tr key={index}>
                                    <td>{u.userFirstName}</td>
                                    <td>{u.userLastName}</td>
                                    <td>{u.userEmail}</td>
                                    <td>{u.password}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};



export default RegistrationForm;
