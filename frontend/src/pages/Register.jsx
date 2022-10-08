
import {useEffect, useState} from "react";
import {FaUser} from "react-icons/fa";
import {
    // useSelector is a hook that allows us to access the state of the store
    // instead of using the store directly, we use useSelector to access the state of the store
    // it returns the state of the store as an object
    // in other words, useSelector is used to select something from the state (user, isLoading, etc)
    // in our case, the state of the store is the user object
    useSelector,
    // useDispatch is a hook, which returns a function that allows us to dispatch actions to the store
    // in other words, useDispatch is used to dispatch actions to the store
    // in our case: for dispatching the functions like "register", async Thunk, or "reset" in our reducer
    useDispatch
} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {register, reset} from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    });
    const { name, email, password, confirm_password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // here the "state" is a global state of the store,
    // so we'll just retrieve the part of the state that we need (state.auth in our case)
    const {user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) { // "fullfilled" case or this means that the user is logged in
            navigate("/");
        }

        // set everything back, whether it's a success or an error
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

        if (password === confirm_password) {
            // this is the data that we'll send to the Thunk action creator,
            // as the first argument of createAsyncThunk's async function
            const userData = { name, email, password };
            dispatch(register(userData));
        } else {
            toast.error("Passwords do not match!");
        }
    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Create an account</p>
            </section>
            <section className='form'>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className='form-group'>
                        <input onChange={(e) => setFormData({...formData, name: e.target.value})}
                               type='text'
                               id='name'
                               name='name'
                               value={name}
                               placeholder='Enter your name'
                               className='form-control'
                               autoComplete='off'
                        />
                    </div>
                    <div className='form-group'>
                        <input onChange={(e) => setFormData({...formData, email: e.target.value})}
                               type='email'
                               id='email'
                               name='email'
                               value={email}
                               placeholder='Enter your email'
                               className='form-control'
                               autoComplete='off'
                        />
                    </div>
                    <div className='form-group'>
                        <input onChange={(e) => setFormData({...formData, password: e.target.value})}
                               type='password'
                               id='password'
                               name='password'
                               value={password}
                               placeholder='Type the password'
                               className='form-control'
                               autoComplete='off'
                        />
                    </div>
                    <div className='form-group'>
                        <input onChange={(e) => setFormData({...formData, confirm_password: e.target.value})}
                               type='password'
                               id='confirm_password'
                               name='confirm_password'
                               value={confirm_password}
                               placeholder='Confirm your password'
                               className='form-control'
                               autoComplete='off'
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Register</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Register;
