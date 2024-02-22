import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CryptoJS from 'crypto-js';
import '../../styles/LogIn.css'

const LogInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({
        errorEmail: '',
        errorPassword: ''
    });
    const users = useSelector((state) => state.users)


    const navigate = useNavigate();


    const isErrorStyle = (prop) => {
        return  (error[prop] === '') ? '' : 'error';
    }

    const handleValue = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                setEmail(value)
                break;
            case 'password':
                setPassword(value)
                break;
        }
    }

    const signIn = () => {
        const isEmailIsValid = users.some(obj => obj['userEmail'] === email);

        if (isEmailIsValid) {
            
            const currentUser = users.find(obj => obj["userEmail"] === email)

            const enteredPasswordHash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
            console.log(enteredPasswordHash)

            if (enteredPasswordHash === currentUser['password']) {
                alert('success')
            } 
            setError({
                errorEmail:'',
                errorPassword:( enteredPasswordHash === currentUser['password'] ?'':'The password is valid'),
            });

        } else{

            setError(({
                errorPassword:'',
                errorEmail:(isEmailIsValid?'':'The login is valid'),
            }));
        }
    };

    const signUp = () => {
        navigate('/')
    }
    
    return (
        <div className="login-field">
            <div className="login-form">

                <div className="login-title">
                    Sign In
                </div>

                <div className="login-input-box">
    
                    <span className={`input-description `}>

                            Email:
                        </span>
                        <input className={`input-field ${isErrorStyle('errorEmail')}`} type="text" name="email" onChange={handleValue} />
                    </div>
                    <span className="error-message">
                        {error.errorEmail}
                    </span>

                    <div>
                        <span className="input-description ">
                            Password:
                        </span>
                        <input className={`input-field ${isErrorStyle('errorPassword')}`} type="password" name="password" onChange={handleValue} />
                    </div>

                    <span className="error-message">
                        {error.errorPassword}
                    </span>


                    <div className="buttons">
                        <button className=" button sign-in" onClick={signIn}>Sign In</button>
                        <button className=" button sign-up" onClick={signUp}>Sign up</button>
                    </div>
            </div>
        </div>

    )
};
export default LogInForm;