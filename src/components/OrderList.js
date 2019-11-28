import React, { Component } from 'react'
import { Row, Col} from 'reactstrap';

export class OrderList extends Component {
	render() {
		return (
			<Col>
				<h2>Order List</h2>
				<Row>
					<Col md={6}>
						<legend>Diner 1</legend>
						<ul>
						{
							this.props.order && Object.keys(this.props.order.diner1).map((course) => {
								const dish = this.props.order.diner1[course];
								if (dish != '') return <li key={course}><span>({course}) {this.props.getMenuById(dish).name} <span className="delete" onClick={() => this.props.handleRemoveOrder('diner1',course)}>x</span></span></li>;
							})
						}
						</ul>
					</Col>
					<Col md={6}>
						<legend>Diner 2</legend>
						<ul>
						{
							this.props.order && Object.keys(this.props.order.diner2).map((course) => {
								const dish = this.props.order.diner2[course];
								if (dish != '') return <li key={course}><span>({course}) {this.props.getMenuById(dish).name} <span className="delete" onClick={() => this.props.handleRemoveOrder('diner2',course)}>x</span></span></li>;
							})
						}
						</ul>
					</Col>
				</Row>
			</Col>
		)
	}
}

export default OrderList
