
import {useState} from "react";
import {FaSignInAlt} from "react-icons/fa";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;

    const onSubmit = e => {
        e.preventDefault();
        console.log(formData);
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
