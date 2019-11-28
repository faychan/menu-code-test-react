import React, { Component } from 'react';
import { Container, Row, Col, Input, FormGroup, Label, Button, Alert} from 'reactstrap';


export class DinerItem extends Component {
  render() {
    return (
      <Col>
        <h2>Select Diner</h2>
        <FormGroup tag="fieldset">
          <FormGroup check>
            <Label check>
            <Input type="radio" name="diner1" checked={this.props.selectedDiner=='diner1'} onChange={this.props.handleSelectDiner}/>Diner 1
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
            <Input type="radio" name="diner2" checked={this.props.selectedDiner=='diner2'} onChange={this.props.handleSelectDiner}/>Diner 2
            </Label>
          </FormGroup>
        </FormGroup>
      </Col>
    )
  }
}

export default DinerItem
