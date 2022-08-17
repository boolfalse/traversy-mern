
import {useState} from "react";
import {FaUser} from "react-icons/fa";

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    });
    const { name, email, password, confirm_password } = formData;

    const onSubmit = e => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <>
            <section className='heading'>
                <FaUser /> Register
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
                               placeholder='Name'
                               autoComplete='off'
                        />
                    </div>
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
                        <input onChange={(e) => setFormData({...formData, confirm_password: e.target.value})}
                               type='password'
                               id='confirm_password'
                               name='confirm_password'
                               value={confirm_password}
                               placeholder='Confirm Password'
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
