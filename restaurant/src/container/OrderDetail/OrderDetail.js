import {NavLink} from 'react-router-dom'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getHistoryDetail, getCategory, getDishesOfRestaurant } from '../../action/restaurant';
import { useParams } from 'react-router-dom';
import { changeStatus, deleteOrderItem, updateOrderItem } from '../../action/restaurant';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CHANGE_STATUS } from '../../action/type';

function OrderDetail() {
    const {order, orderItems} = useSelector(state=>state.restaurant.order);
    const categorys = useSelector(state=>state.restaurant.category);
    const disheAll = useSelector(state=>state.restaurant.dishes_res);
    const dispatch = useDispatch();
    const [dishes, setDishes] = useState([]);
    const [quatity, setQuatity] = useState(Array.from({ length: dishes.length }, () => 1));
    const {oid} = useParams();
    const [status, setStatus] = useState("");
    const [cid, setCid] = useState("0");

    async function handelChangeStatus(e){
        setStatus(e.target.value);
        const action = await changeStatus(e.target.value, oid, localStorage.getItem("access"));
        if(action.type === CHANGE_STATUS) toast.success("Change order status successfully.");
        else toast.error("Order status change failed!");
    }

    useEffect(()=>{
        setDishes(disheAll);
    }, [disheAll]);

    useEffect(()=>{
        async function getcategory(){
            const action = await getCategory();
            dispatch(action);
        }

        async function getDishs(){
            const action = await getDishesOfRestaurant(localStorage.getItem("rid"), localStorage.getItem("access"));
            dispatch(action);
        }

        async function gethistoryDetails(){
            const action  = await getHistoryDetail(oid, localStorage.getItem("access"))
            dispatch(action);
        }

        gethistoryDetails();
        getDishs();
        getcategory();
    }, [])

    useEffect(()=>{
        if(dishes && orderItems){
            const initialQuatity = Array.from({ length: dishes.length }, () => 1);
            for(let i=0;i<dishes.length;i++){
                for(let j=0;j<orderItems.length;j++){
                    if(dishes[i].id ===orderItems[j].id){
                        initialQuatity[i] = Number(orderItems[j].quatity);
                    }
                }
            }
            setStatus(order?order.product_status:null);
            setQuatity(initialQuatity);
        }
        
    }, [dishes, orderItems])

    useEffect(()=>{
        setDishes([]);
        if(cid === "0"){
            let newDishes = [...disheAll];
            setDishes(newDishes);
        }else{
            let newDishes = [];
            disheAll.map((item, index)=>{
                if(item.category.cid === cid){
                    newDishes.push(item);
                    setDishes(newDishes);
                }
            })
        }
    }, [cid])


    const handelAdd = async(did, index)=>{
        const action = await updateOrderItem(oid, did, quatity[index], localStorage.getItem("access"))
        dispatch(action)
    }

    function handelQuantity(index, e){
        const newQuatity = [...quatity];
        newQuatity[index] = e.target.value;
        setQuatity(newQuatity);
    }

    async function handelDelete(did){
        const action = await deleteOrderItem(oid, did, localStorage.getItem("access"))
        dispatch(action)
    }

    return ( 
        <div>
            <nav className='nav-middle'>
                <div className="view-link">
                    <p className='top'>Dashboard</p>
                    <p><NavLink to="/restaurant">Home</NavLink></p>
                    <i class="fas fa-chevron-right"></i>
                    <p><NavLink to="/restaurant/manage-order">Manage Orders</NavLink></p>
                    <i class="fas fa-chevron-right"></i>
                    <p>Order Detail</p>
                </div>
            </nav>
            <div className="add-OrderDetail">
                <div className='row'>
                    <div className='col-lg-5'>
                        <div className="user card">
                            <h3>Information of User</h3>
                            <div className="separate"></div>
                            <div className="content">
                                <div className="item">
                                    <p className="item__title">Name User : </p>
                                    <p className="item__content">{order?order.account.username:""}</p>
                                </div>
                                <div className="item">
                                    <p className="item__title">Phone : </p>
                                    <p className="item__content">{order?order.phone:""}</p>
                                </div>
                                <div className="item">
                                    <p className="item__title">Email : </p>
                                    <p className="item__content">{order?order.account.email:""}</p>
                                </div>
                                <div className="item">
                                    <p className="item__title">Date Order : </p>
                                    <p className="item__content">{order?order.date:""}</p>
                                </div>
                                <div className="item">
                                    <p className="item__title">Time : </p>
                                    <p className="item__content">{order?order.time_from:""} - {order?order.time_to:""}</p>
                                </div>
                                <div className="item">
                                    <p className="item__title">Number of People : </p>
                                    <p className="item__content">{order?order.number_people:""}</p>
                                </div>
                                <div className="item">
                                    <p className="item__title">Table : </p>
                                    <p className="item__content">{order?order.restaurantTable.title:""}</p>
                                </div>
                            </div>
                        </div>
                        <div className="order__restaurant__dish card">
                            <h3>The Dishes</h3>
                            <div className="order__restaurant__dish__detail">
                                <div className="item">
                                    <select onChange={e=>setCid(e.target.value)}>
                                        <option value="0">All the Dishes</option>
                                        {categorys?categorys.map((category, index)=>{
                                            return (
                                                <option value={category.cid} key={index}>{category.title}</option>
                                            )
                                        }):""}
                                    </select>
                                    <div className="search">
                                        <input type="text" placeholder="Search the dish ..."/>
                                        <button><i className="fa-solid fa-magnifying-glass"></i></button>
                                    </div> 
                                </div>
                                <div className="order__restaurant__dish__detail__content">
                                    {dishes.map((dish, index)=>{
                                        return (
                                            <div className="order__restaurant__dish__detail__item" key={index}>
                                                <img src={`${dish.image}`}/>
                                                <div className="detail__item__title">
                                                    <h3>{dish.title}</h3>
                                                </div>
                                                <input type="number" value={quatity[index]} id-dish={dish.id} min="1" onChange={(e)=>handelQuantity(index, e)}/>
                                                <p>{dish.price}</p>
                                                <button><i className="fa-solid fa-plus" onClick={()=>handelAdd(dish.id, index)}></i></button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-7'>
                        <div className="content-payment card">
                            <h3>Information of Order</h3>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th className="payment-title">Title</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItems? orderItems.map((item, index)=>{
                                        return (
                                            <tr key={index}>
                                                <td className="payment-title"><p>{item.dish.title}</p></td>
                                                <td className="payment-price"><span>{item.dish.price}$</span></td>
                                                <td className="payment-quantity"><span>{item.quatity}</span></td>
                                                <td className="payment-amount"><span>{item.total}$</span></td>
                                                <td>
                                                    <i className="fas fa-trash" style={{cursor: "pointer"}}
                                                    onClick={()=>handelDelete(item.dish.id)}></i>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :""}  
                                    <tr>
                                        <td className="title-payment" colSpan="4"><span>SubTotal</span></td>
                                        <td className="payment-subtotal"><span>{order?order.price:0}$</span></td>
                                    </tr>
                                    <tr>
                                    <td className="title-payment" colSpan="4">
                                        <span>Diposited</span>
                                    </td>
                                    <td className="payment-tax"><span>{order?order.deposited:0}$</span></td>
                                    </tr>
                                    <tr>
                                    <td className="title-payment" colSpan="4">
                                        <span>Grand Total</span>
                                    </td>
                                    <td className="payment-total"><span>{order?(order.price-order.deposited):0}$</span></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="form-group">
                                <div class="row">
                                    <label class="col-sm-3 text-left" for="id_category">
                                        <b>Status Order</b>
                                    </label>
                                    <div class="col-sm-7">
                                        <div class="related-widget-wrapper" data-model-ref="category">
                                            <select value={status} className="input" onChange={handelChangeStatus}>
                                                <option value="0">Awaiting confirmation</option>
                                                <option value="1">Confirmed</option>
                                                <option value="2">Complete</option>
                                                <option value="3">Cancel</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
     );
}

export default OrderDetail;