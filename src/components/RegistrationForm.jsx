// RegistrationForm.js
import { useSelector, useDispatch } from "react-redux";
import { setFirstName, setLastName, setEmail, setPassword, setConfirmPassword } from '../actions/action';


const RegistrationForm = () => {
    const userFirstName = useSelector((state) => state.userFirstName);
    const userLastName = useSelector((state) => state.userLastName);
    const userEmail = useSelector((state) => state.userEmail);
    const password = useSelector((state) => state.password);
    const confirmPassword = useSelector((state) => state.confirmPassword);
    const dispatch = useDispatch();

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
    console.log('Redux State:', useSelector((state) => state));

    return (
        <form>
            <label>
                First Name:
                <input type="text" name="userFirstName" value={userFirstName} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                Last Name:
                <input type="text" name="userLastName" value={userLastName} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                Email:
                <input type="text" name="userEmail" value={userEmail} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" name="password" value={password} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                Confirm Password:
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleInputChange} />
            </label>
        </form>
    );
};



export default RegistrationForm;
