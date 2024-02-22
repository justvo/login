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

    const [isBlured, setIsBlured] = useState({
        userFirstName: false,
        userLastName: false,
        userEmail: false,
        password: false,
        confirmPassword: false,
    })

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
            userFirstName: Yup.string().min(3, 'user name must be at least 3 characters long').max(25, 'user name must be at most 25 characters').required('Field is mandatory'),
            userLastName: Yup.string().min(3, 'user last name must be at least 3 characters long').max(25, 'user last name must be at most 25 characters').required('Field is mandatory'),
            userEmail: Yup.string().email('Invalid email format').required('Field is mandatory'),
            password: Yup.string().min(8).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/, 'The password must have at least 8 characters, an uppercase, lowercase letter, a number and a special character').required('Field is mandatory'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords do not match').required('Field is mandatory'),
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

    const blured = (e) => {
        const { name } = e.target;
        switch (name) {
            case 'userFirstName':
                setIsBlured(prev => ({
                    ...prev,
                    userFirstName: true,
                }))
                console.log(isBlured)
                break;
            case 'userLastName':
                setIsBlured(prev => ({
                    ...prev,
                    userLastName: true,
                }))
                break;
            case 'userEmail':
                setIsBlured(prev => ({
                    ...prev,
                    userEmail: true,
                }))
                break;
            case 'password':
                setIsBlured(prev => ({
                    ...prev,
                    password: true,
                }))
                break;
            case 'confirmPassword':
                setIsBlured(prev => ({
                    ...prev,
                    confirmPassword: true,
                }))
                break;
            default:
                break;
        }
    }

    const register = () => {

        const encodedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

        const isEmailIsExist = users.some(obj => obj['userEmail'] === userEmail );
        if (isEmailIsExist){
            alert("User with this email already exists")
            return ;
        }

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
                    Sign Up
                </div>

                <div className="registration-input-box">

                    <div>

                        <span className={`input-description `}>
                            First name:
                        </span>

                        <input className={`input-field ${(errors['userFirstName'] && isBlured.userFirstName) ? 'error' : ''} `} type="text" name="userFirstName" onBlur={blured} onChange={handleInputChange} />

                        <span className="error-message">
                            {(isBlured.userFirstName) ? errors.userFirstName : ''}
                        </span>
                    </div>

                    <div>
                        <span className={`input-description `}>
                            Last Name:
                        </span>
                        <input className={`input-field ${(errors['userLastName'] && isBlured.userLastName) ? 'error' : ''} `} type="text" name="userLastName" onBlur={blured} onChange={handleInputChange} />

                        <span className="error-message">
                            {(isBlured.userLastName) ? errors.userLastName : ''}
                        </span>
                    </div>

                    <div >

                        <span className={`input-description `}>
                            Email:
                        </span>
                        <input className={`input-field ${(errors['userEmail'] && isBlured.userEmail) ? 'error' : ''} `} type="text" name="userEmail" onBlur={blured} onChange={handleInputChange} />
                        <span className="error-message">
                            {(isBlured.userEmail) ? errors.userEmail : ''}
                        </span>
                    </div>

                    <div >
                        <span className={`input-description `}>
                            Password:
                        </span>
                        <input className={`input-field ${(errors['password'] && isBlured.password) ? 'error' : ''} `} type="password" name="password" onBlur={blured} onChange={handleInputChange} />
                        <span className="error-message">
                            {(isBlured.password) ? errors.password : ''}
                        </span>
                    </div>
                    <div >
                        <span className={`input-description `}>
                            Confirm Password:
                        </span>
                        <input className={`input-field ${(errors['confirmPassword'] && isBlured.confirmPassword) ? 'error' : ''} `} type="password" name="confirmPassword" onBlur={blured} onChange={handleInputChange} />
                        <span className="error-message">
                        {(isBlured.confirmPassword) ? errors.confirmPassword : ''}
                        </span>
                    </div>

                </div>

                <div className="buttons" >
                    <button className="button register" disabled={!(Object.values(errors).every((e) => e === null))} onClick={register}>Register</button>
                    <button className='button login' onClick={login} >LogIn</button>
                </div>
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
    );
};

export default RegistrationForm;
