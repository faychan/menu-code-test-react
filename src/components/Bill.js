import React, { Component } from 'react';
import { Row, Col, Button, Alert} from 'reactstrap';


export class Bill extends Component {

	render() {
		return (
			<Col>
				<Row className="my-3">
					<Col>
						<h2>Bill Amount</h2>
						<ul>
							{
								this.props.bills && this.props.bills.map(item => {
									return(
										<li key={item.id}>
											{item.name} (${item.price}) x {item.count} = ${item.price*item.count}
										</li>
									);
								})
							}
						</ul>
						<h3>Total : ${this.props.billAmount}</h3>
					</Col>
				</Row>

				<Row className="my-3">
					<Col>
						<Button onClick={this.props.handleSubmitOrder}>Submit Order</Button>
					</Col>
				</Row>
				<Alert isOpen={this.props.alert2.message!=''} className="my-3" color={this.props.alert2.color}>{this.props.alert2.message}</Alert>
			</Col>
		)
	}
}

export default Bill
