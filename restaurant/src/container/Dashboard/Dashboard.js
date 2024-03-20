import { Chart, BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getHistoryOrder } from '../../action/restaurant';
import {NavLink} from 'react-router-dom'
import { useEffect } from "react";
import img from '../../assets/images/empty.png';
import { statistics } from '../../action/restaurant';
Chart.register(BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

function Dashboard() {
    const {top_user, num_top_user, num_order} = useSelector(state=>state.restaurant.statistics)
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Order',
            data: num_order,
            fill: false,
            backgroundColor: '#b1f3b1',
            tension: 0.1
          }
        ]
    };

    const data2 = {
        labels: top_user,
        datasets: [
          {
            label: 'user',
            data: num_top_user,
            fill: true,
            backgroundColor: [
                'rgba(75, 192, 192, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 205, 86, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(153, 102, 255, 0.5)'
            ],
            tension: 0.1
          }
        ]
    };

    const orders = useSelector(state=>state.restaurant.orders);
    const dispatch = useDispatch();
    const status = ["Awaiting confirmation", "Confirmed", "Cancel", "Complete"];

    useEffect(()=>{
        async function gethistoryOrder(){
            const action  = await getHistoryOrder(localStorage.getItem("rid"), localStorage.getItem("access"))
            dispatch(action);
        }
        async function Fstatistics(){
            const action  = await statistics(localStorage.getItem('rid'), localStorage.getItem('access'))
            dispatch(action);
        }
        gethistoryOrder();
        Fstatistics();
    }, [])

    return ( 
        <div>
            <nav className='nav-middle'>
                <div className="view-link">
                    <p className='top'>Dashboard</p>
                    <p><a href="/restaurant">Home</a></p>
                    <i className="fas fa-chevron-right"></i>
                    <p>Dashboard</p>
                </div>
            </nav>
            <div className="content-dastboard">
                <div className='row'>
                    <div className='col-lg-8 col-sm-12 col-md-12'>
                        <div className='content-chart card'>
                            <h3>Statistics of orders list by month</h3>
                            <Bar className='order-chart' data={data}/>
                        </div>
                    </div>
                    <div className='col-lg-4 col-sm-12 col-md-12'>
                        <div className='content-chart card'>
                            <h3>Statistics of users who order the most</h3>
                            <Pie className='user-chart' data={data2} />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-12 col-sm-12 col-md-12'>
                    <div className='content-order card'>
                            <h3>The current order</h3>
                            <table id="result_list" className="table table-striped">
                                <thead>
                                    <tr>
                                        <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                            <div className="text">
                                                <p>Oid</p>
                                            </div>
                                        </th>
                                        <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                            <div className="text">
                                                <p>Order Date</p>
                                            </div>
                                        </th>
                                        <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                            <div className="text">
                                                <p>Price</p>
                                            </div>
                                        </th>
                                        <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                            <div className="text">
                                                <p>Product Status</p>
                                            </div>
                                        </th>
                                        <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                            <div className="text">
                                                <p>Time from</p>
                                            </div>
                                        </th>
                                        <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                            <div className="text">
                                                <p>Time to</p>
                                            </div>
                                        </th>
                                        <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                            <div className="text">
                                                <p>Number People</p>
                                            </div>
                                        </th>
                                        <th className="sorting" tabIndex="0" rowSpan="1" colSpan="1">
                                            <div className="text">
                                                <p>Deposit</p>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders&&orders.length>0?orders.map((item, index)=>{
                                        if(index<10)
                                        return (
                                            <tr role="row" className="even" key={index}>
                                                <th><NavLink to={`/restaurant/history-detail/${item.id}`} >{item.id}</NavLink></th>
                                                <td>{item.date}</td>
                                                <td>{item.price}$</td>
                                                <td>{status[item.product_status]}</td>
                                                <td>{item.time_from}</td>
                                                <td className="nowrap">{item.time_to}</td>
                                                <td className="nowrap">{item.number_people}</td>
                                                <td className="nowrap">{item.deposited}$</td>
                                            </tr>
                                        )
                                    }): <tr role="row">
                                        <td colSpan={7} className="text-center">
                                            <img src={img}/>
                                            <h6 className="text-secondary">No data</h6>
                                        </td>
                                    </tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
