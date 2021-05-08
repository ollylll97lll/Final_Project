import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Row from '../../node_modules/react-bootstrap/esm/Row'
import Chart from 'react-google-charts'
import { summaryOrder } from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function Dashboard() {
    const orderSummary = useSelector(state => state.orderSummary)
    const { loading, summary, error } = orderSummary;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(summaryOrder());
    }, [dispatch])
    return (
        <div style={{marginTop:"120px"}} >
            <Row className="mx-1">
                <h1>DASHBOARD</h1>
            </Row>
            {
                loading ? (<LoadingBox />)
                    : error ? (<MessageBox variant="danger" >{error}</MessageBox>)
                        : (
                            <>
                                <ul className="row summary">
                                    <li>
                                        <div className="summary-title color1">
                                            <span>USERs</span>
                                        </div>
                                        <div className="summary-body">{summary.users[0].numUsers}</div>
                                    </li>

                                    <li>
                                        <div className="summary-title color2">
                                            <span>ORDERs</span>
                                        </div>
                                        <div className="summary-body">{summary.orders[0] ? summary.orders[0].numOrders : 0}</div>
                                    </li>

                                    <li>
                                        <div className="summary-title color3">
                                            <span>SALEs</span>
                                        </div>
                                        <div className="summary-body">{summary.orders[0] ? summary.orders[0].totalSales.toFixed(2) : 0} <sup> &#8363;</sup> </div>
                                    </li>

                                </ul>

                                <div>
                                    <div>
                                        <h2>Sales</h2>
                                        {
                                            summary.dailyOrders.length === 0 ?
                                                (<MessageBox>No Sale</MessageBox>) :
                                                (
                                                    <Chart
                                                        width="100%"
                                                        height="33vh"
                                                        chartType="AreaChart"
                                                        loader={<div>Loading Chart</div>}
                                                        data={[
                                                            ['Date', 'Sales'],
                                                            ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                                                        ]} />
                                                )
                                        }
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <h2>Category</h2>
                                        {
                                            summary.productCategories.length === 0 ?
                                                (<MessageBox>No Category</MessageBox>) :
                                                (
                                                    <Chart width="100%"
                                                        height="33vh"
                                                        chartType="PieChart"
                                                        loader={<div>...LOADING...</div>}
                                                        data={[
                                                            ['Category', 'Products'],
                                                            ...summary.productCategories.map((x) => [x._id, x.count]),
                                                        ]} />
                                                )
                                        }
                                    </div>
                                </div>

                            </>
                        )
            }
        </div>
    )
}
