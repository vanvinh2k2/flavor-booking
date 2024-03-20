import MutiRangeSlider from "multi-range-slider-react"
import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getCategory, getRestaurant } from "../../../action/restaurant";

function Fillter({min_price, max_price, setMinPrice, setMaxPrice, setCategorys, setRestaurants}) {
    const dispatch = useDispatch();
    const list_restaurant = useSelector(state=>state.restaurant?state.restaurant.restaurant:[]);
    const list_category = useSelector(state=>state.restaurant?state.restaurant.categorys:[]);

    const handleInput = (e)=>{
        setMinPrice(e.minValue)
        setMaxPrice(e.maxValue)
    }

    function handelRes(e){
        const rid = e.target.value;
        if (e.target.checked) {
            setRestaurants((prevSelected) => [...prevSelected, {"rid": rid}]);
        } else {
            setRestaurants((prevSelected) => prevSelected.filter(restaurant => restaurant['rid'] !== rid));
        }
    }

    function handelCat(e){
        const cid = e.target.value;
        if (e.target.checked) {
            setCategorys((prevSelected) => [...prevSelected, {"cid": cid}]);
        } else {
            setCategorys((prevSelected) => prevSelected.filter(category => category['cid'] !== cid));
        }
    }

    useEffect(()=>{
        async function getcategory(){
            const action = await getCategory();
            dispatch(action);
            console.log(action);
        }

        async function getrestaurant(){
            const action = await getRestaurant(1);
            dispatch(action);
            console.log(action);
        }

        getcategory();
        getrestaurant();
    }, [])

    return ( 
        <div className="sidebar">
            <div className="sidebar__item">
                <h3 data='' value=''>By Restaurant</h3>
                    {list_restaurant&&list_restaurant.length>0?list_restaurant.map((res, index)=>{
                        return (
                            <label htmlFor={res.id} key={index}>
                                <input className="filter-checkbox" 
                                    type="checkbox" rid={res.id} 
                                    value={res.id} 
                                    onChange={handelRes}
                                />
                                <p>{res.title}</p>
                            </label>
                        )
                    }):""}
                
            </div>
            <div className="sidebar__item">
                <div className="separate"></div>
                <h3>By Category</h3>
                <div className="sidebar__item__vendor">
                    {list_category&&list_category.length>0?list_category.map((category, index)=> {
                        return(
                            <label htmlFor={category.id} key={index}>
                                <input className="filter-checkbox" 
                                    type="checkbox" cid={category.id} 
                                    value={category.id}
                                    onChange={handelCat}/>
                                <p>{category.title}</p>
                            </label>
                        )
                    }):""}
                </div>
            </div>
            <div className="sidebar__item view-top">
                <div className="separate"></div>
                <h3>By price</h3>
                <div className="price-range-wrap">
                    <MutiRangeSlider
                        min={0}
                        max={0}
                        step={5}
                        minValue={min_price}
                        maxValue={max_price}
                        onInput={(e) =>{
                            handleInput(e);
                        }}
                    />
                    <div className="price-range-content">
                        <span>{min_price}$</span>
                        <span>-</span>
                        <span>{max_price}$</span>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Fillter;