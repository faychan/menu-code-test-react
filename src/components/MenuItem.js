import React, { Component } from 'react';
import { Col, Input, FormGroup, Label} from 'reactstrap';


export class MenuItem extends Component {
	render() {
		return (
			<Col key={this.props.title} md={4}>
				<FormGroup tag="fieldset">
					<legend>{this.props.title}</legend>
					{
						this.props.section && this.props.section.map(item => {
							return(
								<FormGroup check key={item.id}>
									<Label check>
									<Input type="radio" name={item.id} checked={this.props.selectedMenu==item.id} onChange={this.props.handleSelectDish}/> {item.name} (${item.price})
									</Label>
								</FormGroup>
							);
						})
					}
				</FormGroup>
			</Col>
		)
	}
}

export default MenuItem
