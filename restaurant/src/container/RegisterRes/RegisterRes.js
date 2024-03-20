import logo from '../../assets/images/logo1.png';
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { register } from '../../action/auth';
import { REGISTER_SUCCESS } from '../../action/type';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterRes() {
    const [form, setForm] = useState({
        email: localStorage.getItem("email"),
        address: "",
        title: "",
        phone: ""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {uid} = useParams();

    const handleSubmit = async(e)=>{
        const {email, address, title, phone} = form;
        e.preventDefault();
        const action = await register(title, email, address, phone, uid);
        dispatch(action);
        if(action.type === REGISTER_SUCCESS){
            toast.success("Register successfully.")
            navigate("/");
        }
    }

    function handleForm(e){
        setForm({...form, [e.target.name]: e.target.value});
    }

    return ( 
        <div className="login">
        <div className="login-box">
            <div className="login-logo">
                <img src={logo} alt="Restaurant Reservation"/>
            </div>
            <div className="card">
                <div className="card-body">
                <p className="login-box-msg">Register the restaurant account</p>
                <form 
                onSubmit={(e)=>handleSubmit(e)}
                >
                    <div className="input-group mb-3">
                        <input type="text" 
                        name="username" className="form-control" placeholder={localStorage.getItem("username")} disabled/>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-user"></span>
                            </div>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" 
                        name="email" className="form-control" placeholder={localStorage.getItem("email")} disabled/>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fa-solid fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" 
                        onChange={handleForm} 
                        name="title" className="form-control" placeholder="Restaurant name"/>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fa-solid fa-utensils"></span>
                            </div>
                        </div>
                    </div>

                    <div className="input-group mb-3">
                        <input type="text" 
                        onChange={handleForm} 
                        name="phone" className="form-control" placeholder="Phone"/>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fa-solid fa-phone"></span>
                            </div>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" 
                        onChange={handleForm} 
                        name="address" className="form-control" placeholder="Address"/>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fa-solid fa-location-dot"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary btn-block">
                                Confirm 
                            </button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
        <ToastContainer/>
    </div>
     );
}

export default RegisterRes;