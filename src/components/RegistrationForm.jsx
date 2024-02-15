// RegistrationForm.js
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setFirstName, setLastName, setEmail, setPassword, setConfirmPassword, setUsers } from '../actions/action';


const RegistrationForm = () => {
    const [error, setError] = useState([null, null, null, null, null])
    const [keyError, setKeyError] = useState('')

    const userFirstName = useSelector((state) => state.userFirstName);
    const userLastName = useSelector((state) => state.userLastName);
    const userEmail = useSelector((state) => state.userEmail);
    const password = useSelector((state) => state.password);
    const confirmPassword = useSelector((state) => state.confirmPassword);
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        const validate = () => {
            let hundleEror = [...error]
            switch (keyError) {
                case '1':
                    if (userFirstName.length < 3 || userFirstName.length >= 25) {
                        hundleEror[0] = 'The name must contain from 3 to 25 characters';
                        setError([...hundleEror]);
                    } else {
                        hundleEror[0] = null;
                        setError([...hundleEror]);
                    }
                    break;
                case '2':
                    if (userLastName.length < 3 || userLastName.length >= 25) {
                        hundleEror[1] = 'The last name must contain from 3 to 15 characters'
                    } else {
                        hundleEror[1] = null;
                    }
                    setError([...hundleEror]);
                    break;
                case '3':
                    if (userEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
                        hundleEror[2] = 'Invalid email format';
                    } else {
                        hundleEror[2] = null;
                    }
                    setError([...hundleEror]);
                    break;
                case '4':
                    if (password.length < 8) {
                        hundleEror[3] = 'The password must be at least 8 characters long.';
                    } else if (!/\d/.test(password)) {
                        hundleEror[3] = 'The password must contain at least one number.';
                    } else if (!/[A-Z]/.test(password)) {
                        hundleEror[3] = 'The password must contain at least one uppercase letter.';
                    } else if (!/[a-z]/.test(password)) {
                        hundleEror[3] = 'The password must contain at least one lowercase letter.';
                    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                        hundleEror[3] = 'The password must contain at least one special character.';
                    } else if ((confirmPassword !== '')&& confirmPassword !== password ) {
                        hundleEror[3] = 'Passwords do not match.';
                        setKeyError('5')
                    } else {
                        hundleEror[3] = null;
                    }
                    setError([...hundleEror]);
                    break;
                case '5':
                    setKeyError('5')
                    if (confirmPassword !== password) {
                        hundleEror[4] = 'Passwords do not match';
                    } else {
                        setKeyError('4')
                        hundleEror[4] = null;
                    }
                    setError([...hundleEror]);
                    break;
                default:
                    hundleEror = [null, null, null, null, null]
                    setError([...hundleEror])
                    break;
            }
        }

        validate();

    }, [keyError, userFirstName, userLastName, userEmail, password, confirmPassword])




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'userFirstName':
                dispatch(setFirstName(value))
                setKeyError('1');
                break;
            case 'userLastName':
                dispatch(setLastName(value))
                setKeyError('2');
                break;
            case 'userEmail':
                dispatch(setEmail(value))
                setKeyError('3');
                break;
            case 'password':
                dispatch(setPassword(value))
                setKeyError('4');
                break;
            case 'confirmPassword':
                dispatch(setConfirmPassword(value))
                setKeyError('5');
                break;
            default:
                break;
        }
    };

    const register = () => {

        const newUser = {
            userFirstName: userFirstName,
            userLastName: userLastName,
            userEmail: userEmail,
            password: password,
        }
        if (error.every((e)=>e === null)) {
            dispatch(setUsers(newUser));
        }
    }


    return (
        <div className="main-page">
            <h1>Registration Form</h1>
            <div className="registr-form">
                <label className="input-field">
                    {error[0]}
                    First name:
                    <input type="text" name="userFirstName" value={userFirstName} onChange={handleInputChange} />
                </label>
                <br />
                <label className="input-field">
                    {error[1]}
                    Last Name:
                    <input type="text" name="userLastName" value={userLastName} onChange={handleInputChange} />
                </label>
                <br />
                <label className="input-field email">
                    {error[2]}
                    Email:
                    <input type="text" name="userEmail" value={userEmail} onChange={handleInputChange} />
                </label>
                <br />
                <label className="input-field password">
                    {error[3]}
                    Password:
                    <input type="password" name="password" value={password} onChange={handleInputChange} />
                </label>
                <br />
                <label className="input-field password">
                    {error[4]}
                    Confirm Password:
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleInputChange} />
                </label>
            </div>

            <div className="registr-button" >
                <button name="register" disabled={error.every((e)=>{e ===null})} onClick={register}>Register</button>
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
