import React, { Component } from 'react';
import MenuItem from './MenuItem';
import DinerItem from './DinerItem';
import { Row, Col, Button, Alert} from 'reactstrap';

export class Menu extends Component {
	
	render() {
		return (
			<Col>
				<Row className="my-3">
					<Col>
						<h2>Select Menu</h2>
						<Row>
							<MenuItem title="starters" handleSelectDish={this.props.handleSelectDish} section={this.props.menuData.starters} selectedMenu={this.props.selectedMenu}/>
							<MenuItem title="mains" handleSelectDish={this.props.handleSelectDish} section={this.props.menuData.mains} selectedMenu={this.props.selectedMenu}/>
							<MenuItem title="desserts" handleSelectDish={this.props.handleSelectDish} section={this.props.menuData.desserts} selectedMenu={this.props.selectedMenu}/>
						</Row>
					</Col>
				</Row>

				<Row className="my-3">
					<DinerItem handleSelectDiner={this.props.handleSelectDiner} selectedDiner={this.props.selectedDiner}/>
				</Row>

				<Row className="my-3">
					<Col>
						<Button onClick={this.props.handleAddOrder}>Add Order</Button>
					</Col>
				</Row>
				<Alert isOpen={this.props.alert1.message!=''} className="my-3" color={this.props.alert1.color}>{this.props.alert1.message}</Alert>
			</Col>
		);
	}
}

export default Menu
