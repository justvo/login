import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CryptoJS from 'crypto-js';

const LogInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const users = useSelector((state) => state.users)


    const navigate = useNavigate();



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
            setError('');
            const currentUser = users.find(obj => obj["userEmail"] === email)
            
            const enteredPasswordHash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
            console.log(enteredPasswordHash)

            if (enteredPasswordHash === currentUser['password']) {
                alert('success')
                setError('');
            }else{
                setError('password is incorrect');  
            }
        }else{
            setError('the login is incorrect');
        }
    };

    const signUp = () => {
        navigate('/')
    }
    return (
        <div className="login-form">
            <div>
                Email:
                <input type="text" name="email"  onChange={handleValue} />
            </div>

            <div>
                Password:
                <input type="password" name="password"  onChange={handleValue} />
            </div>
            {error}

            <div>
                <button onClick={signIn}>Sign In</button>
                <button onClick={signUp}>Sign up</button>
            </div>
        </div>
    )
};
export default LogInForm;