import React from 'react';
import {Modal, ControlLabel, FormGroup, FormControl, Button} from 'react-bootstrap';

export class EditApartment extends React.Component{
    constructor(props){
        super(props);
        this.state = {name:"", parts:""};
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePartsChange = this.handlePartsChange.bind(this);

        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    static getDerivedStateFromProps(props, state){
        const prevName = state.prevName;
        const prevParts = state.prevParts;
        
        const name = prevName !== props.apartment.name ? props.apartment.name : state.name;
        const parts = prevParts !== props.apartment.parts.join(",") ? props.apartment.parts.join(",") : state.parts;

        return{
            prevName: props.apartment.name, name,
            prevParts: props.apartment.parts.join(","), parts,
        }
    }

    handleNameChange(e){
        this.setState({name: e.target.value});
    }
    handlePartsChange(e){
        this.setState({parts: e.target.value});
    }
    handleEdit(e){
        e.preventDefault();
        const onEdit = this.props.onEdit;
        const currentlyEditing = this.props.currentlyEditing;
        const regExp = /\s*,\s*/;

        var name = this.state.name;
        var parts = this.state.parts.split(regExp);

        onEdit(name, parts, currentlyEditing);
    }
    handleCancel(){
        const onEditModal = this.props.onEditModal;
        this.setState({name: this.props.apartment.name, parts: this.props.apartment.parts.join(",")});
        onEditModal();
    }

    render(){
        const onShow = this.props.onShow;
        var regex1 = /^\S/;
        var regex2 = /^[^,\s]/;
        var regex3 = /[^,\s]$/;
        const validApartment = regex1.test(this.state.name) && regex2.test(this.state.parts) && regex3.test(this.state.parts);

        return(
            <Modal show={onShow} onHide={this.handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Apartment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup controlId="formControlName">
                        <ControlLabel>Apartment Name</ControlLabel>
                        <FormControl type="text" required onChange={this.handleNameChange} value={this.state.name}
                        placeholder="Enter name"/>
                    </FormGroup>
                    <FormGroup controlId="formControlParts">
                        <ControlLabel>Aparment Parts</ControlLabel>
                        <FormControl componentClass="textarea" type="text" required onChange={this.handlePartsChange}
                            value={this.state.parts} placeholder="Enter Parts(separate by commas"/>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={!validApartment} bsStyle="success" onClick={this.handleEdit}>Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }
};