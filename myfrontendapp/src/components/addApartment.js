import React from 'react';
import {Modal,ControlLabel,FormGroup,FormControl,Button} from 'react-bootstrap';

//import React, { Component } from 'react';

//class to display the modal for adding a new apartment and export it
export class AddApartment extends React.Component {
  constructor(props){ //create a state to handle the new apartment
    super(props);
    this.state = {name:"", parts:""};
    this.handleApartmentNameChange=this.handleApartmentNameChange.bind(this);
    this.handleApartmentPartsChange=this.handleApartmentPartsChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  //change name
  handleApartmentNameChange(e){
    this.setState({name: e.target.value});
  }
  //change parts
  handleApartmentPartsChange(e){
    this.setState({parts: e.target.value});
  }
  //get the apartment data, manipulate it and call the function for creating a new apartment.
  handleSubmit(event){
    event.preventDefault();
    const onAdd = this.props.onAdd;
    const regExp = /\s*,\s*/;
    var newName = this.state.name;
    var newParts = this.state.parts.split(regExp);
    var newApartment = {name: newName, parts: newParts};
    onAdd(newApartment);

    this.setState({name:"", parts:""});
  }

  handleCancel(){
    const onAddModal = this.props.onAddModal;
    this.setState({name:"", parts:""});
    onAddModal();
  }

  render() {
      const onShow = this.props.onShow;
      var regex1 = /^\S/;
      var regex2 = /^[^,\s]/;
      var regex3 = /[^,\s]$/;
      const validApartment = regex1.test(this.state.name) && regex2.test(this.state.parts) && regex3.test(this.state.parts);
      return(
        <Modal show={onShow} onHide={this.handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>New Apartment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup controlId="formControlsName">
              <ControlLabel>Apartment Name</ControlLabel>
              <FormControl type="text" required onChange={this.handleApartmentNameChange} value={this.state.name} placeholder="Enter Name" />
            </FormGroup>
            <FormGroup controlId="formControlsParts">
              <ControlLabel>Apartment Parts</ControlLabel>
              <FormControl componentClass="textarea" type="text" required onChange={this.handleApartmentPartsChange} value={this.state.parts} placeholder="Enter Parts(separate by commas)" />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={!validApartment} bsStyle="success" onClick={this.handleSubmit}>Save Apartment</Button>
          </Modal.Footer>
        </Modal>
    );
  }
};

