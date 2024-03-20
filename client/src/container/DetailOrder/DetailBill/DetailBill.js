import { useState , useEffect} from "react";
import { useDispatch, useSelector} from "react-redux"
import { getCategory } from "../../../action/restaurant";
import {useParams} from 'react-router-dom';
import PayPal from "../../../components/PayPal/PayPal";
import { addOrder } from "../../../action/order";
import { ADD_ORDER_OK } from "../../../action/types";
import {useNavigate} from 'react-router-dom';

function DetailBill(props) {
    const categorys = useSelector(state=>state.restaurant.categorys);
    const {rid} = useParams();
    const dispatch = useDispatch();
    const orderDetail = props.orderDetail;
    const order = props.order;
    const [hide, setHide] = useState([]);
    const [orderDish, setOrderDish] = useState([]);
    const [sumPrice, setSumPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(()=>{
        setOrderDish(orderDetail);
    }, [orderDetail])

    useEffect(()=>{
        let initSumPrice = 0;
        const initialHide = Array.from({ length: categorys.length }, () => 0);
        if(orderDetail && orderDetail.length>0){
            for(const orderItem of orderDish){
                initSumPrice = initSumPrice + (orderItem.dish.price*orderItem.quatity);
            }
            if (orderDish && orderDish.length > 0) {
                for (const orderItem of orderDish) {
                    const categoryIndex = categorys.findIndex(category => category.cid === orderItem.dish.category.cid);
                    if (categoryIndex !== -1) {
                        initialHide[categoryIndex] = 1;
                    }
                }
            }
        }
        setHide(initialHide);
        setSumPrice(initSumPrice);
    }, [orderDish])

    useEffect(()=>{
        async function getcategory(){
            const action = await getCategory(rid);
            dispatch(action);
        }
        getcategory();
    }, []);

    const handelPayment = async()=>{
        const data = {
            order: order, orderDetail: orderDish, deposit: 0, price: sumPrice, rid: rid
        }
        const action = await addOrder(data, localStorage.getItem("access"), localStorage.getItem("access"));
        console.log(action);
        if(action.type === ADD_ORDER_OK) navigate(`/bill/${action.payload}`);
    }

    const handelQuantity = (e, index)=>{
        const quantity = e.target.value;
        const newOrderDish = [...orderDish];
        newOrderDish[index].quatity = quantity;
        setOrderDish(newOrderDish);
    }

    const handelDelete = (did)=>{
        let newOrderDish = [...orderDish];
        newOrderDish = newOrderDish.filter(order=>order.dish.id !== did);
        setOrderDish(newOrderDish);
    }
    
    return ( 
        <div className="col-lg-7 col-sm-12 col-md-12">
            <div className="order__bill">
                <h3>The Orders</h3>
                <div className="order__bill__detail">
                    <div className="order__bill__detail__content">
                        {categorys.map((category, index) => (
                        <div key={index} style={{width: '100%'}}>
                            {hide[index] === 0?null
                            :<h3>{category.title}</h3>}
                            {orderDish?orderDish.map((order, index2) => (
                                order.dish.category.id !== category.id? "":
                                <div className="order__bill__detail__item" key={index2}>
                                    <img src={order.dish.image}/>
                                    <div className="title">
                                        <h3>{order.dish.title}</h3>
                                        <span>Suggested</span>
                                    </div>
                                    <input type="number" value={order.quatity} min="1" id-dish={order.dish.id} onChange={(e)=>handelQuantity(e, index2)}/>
                                    <p>{order.dish.price}</p>
                                    <button className="eye"><i className="fas fa-trash" onClick={()=>handelDelete(order.dish.id)}></i></button>
                                </div>
                            )): null}
                        </div>
                        ))}
                    </div>
                </div>
                <div className="order__bill__cost">
                    <div className="order__bill__cost__price">
                        <p className="title__total">Total :</p>
                        <p className="content_total">{sumPrice}$</p>
                    </div>
                    {sumPrice > 100?
                    <>
                        <div className="order__bill__cost__price">
                            <p className="title__total">Deposit :</p>
                            <p className="content_total">{sumPrice*30/100}$</p>
                        </div>
                        <p><b>Note: </b>You need to pay a deposit to confirm the order</p>
                        <PayPal amount={sumPrice*30/100} 
                        // pee={"dungtran240501@gmail.com"} 
                            pee={"dungtran240501@gmail.com"}
                            payload ={{
                                order: order, orderDetail: orderDish, deposit: sumPrice*30/100, price: sumPrice, rid: rid
                        }}/>
                    </>
                    : <>
                    <button className="btn" onClick={handelPayment}>Confirm</button>
                    </>
                    }
                    
                </div>
            </div>
        </div>
     );
}

export default DetailBill;