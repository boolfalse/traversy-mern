
import {useEffect, useState} from "react";
import {FaSignInAlt} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {login, reset} from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) { // "fullfilled" case or this means that the user is logged in
            navigate("/");
        }

        dispatch(reset()); // reset the state of the store to the initial
    }, [
        user,
        isSuccess,
        isError,
        message,
        navigate, // for avoiding the useEffect's stupid warning
        dispatch,
    ]);

    const onSubmit = e => {
        e.preventDefault();
        if (password.length > 0) {
            const userData = { email, password };
            dispatch(login(userData));
        } else {
            toast.error("Password is required!");
            return;
        }
    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className='heading'>
                <FaSignInAlt /> Login
                <p>Sign in to your account</p>
            </section>
            <section className='form'>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className='form-group'>
                        <input onChange={(e) => setFormData({...formData, email: e.target.value})}
                               type='email'
                               id='email'
                               name='email'
                               value={email}
                               placeholder='Email'
                               autoComplete='off'
                        />
                    </div>
                    <div className='form-group'>
                        <input onChange={(e) => setFormData({...formData, password: e.target.value})}
                               type='password'
                               id='password'
                               name='password'
                               value={password}
                               placeholder='Password'
                               autoComplete='off'
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Login</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Login;
