import React from 'react';
import ReactDOM from 'react-dom';
import recipeBox from './recipeBox';
import {PanelGroup, Panel, Button, ButtonToolbar,ListGroup,ListGroupItem} from 'react-bootstrap';
import {Card, CardTitle, CardText} from 'reactstrap';
import {AddApartment} from './components/addApartment';
import {EditApartment} from './components/edit';
import './css/index.css';

//main class
class Recipe extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            apartments:[
                {
                    name:"apartment a",
                    parts:[
                        "sala","cocina",        
                    ] 
                },
                {
                    name:"apartment b",
                    parts:[
                        "baño", "jardin", "lavanderia"
                    ]
                },
                {
                    name:"apartment c",
                    parts:[
                        "baño principal", "sotano", "parqueo","estudio"
                    ]
                }
            ],
            showAdd: false,
            showEdit: false,
            currentlyEditing: 0
        };
        this.showAddModal = this.showAddModal.bind(this);
        this.showEditModal = this.showEditModal.bind(this);
        this.addApartments = this.addApartments.bind(this);
        this.editApartment = this.editApartment.bind(this);
        this.deleteApartment = this.deleteApartment.bind(this);
    }
    //Show Modals
    showAddModal(){
        this.setState({showAdd: !this.state.showAdd});
    }
    showEditModal(index){ //show the edit modal
        this.setState({showEdit: !this.state.showEdit, currentlyEditing: index});
    }

    //create new apartment
    addApartments(apartment){
        let apartments = this.state.apartments;
        apartments.push(apartment);

        this.setState({apartments: apartments});
        this.showAddModal();
    }
    editApartment(newName, newParts, currentlyEditing){//edit an exist apartment
        let apartment = this.state.apartments;
        apartment[currentlyEditing] = {name: newName, parts: newParts};

        this.setState({apartment: apartment});
        this.showEditModal(currentlyEditing);
    }
    deleteApartment(index){
        let apartment = this.state.apartments.slice();
        apartment.splice(index, 1);
        this.setState({apartments: apartment, currentlyEditing: 0});
    }

    render(){
        const apartments = this.state.apartments;
        return(
            <div className="jumbotron">
                <h1>APARTMENTS FOR RENT</h1>
                <PanelGroup accordion id="recipes">
                    {apartments.map((apartment, index) =>(
                        <Panel eventKey={index} key={index}>
                            <Panel.Heading className="title text-center"><h3>{apartment.name}</h3></Panel.Heading>
                                
                            
                            <Panel.Title  toggle>Caracteristicas:</Panel.Title>
                            <Panel.Body collapsible>
                                <ListGroup>
                                    {
                                        apartment.parts.map((parts, index) => (
                                            <ListGroupItem key = {index}>{parts}</ListGroupItem>
                                        ))
                                        
                                    }
                                </ListGroup>
                                <ButtonToolbar>
                                    <Button bsStyle="warning" onClick={() => {this.showEditModal(index)}}>Edit</Button>
                                    <Button bsStyle="danger" onClick={()=> {this.deleteApartment(index)}}>Delete</Button>
                                </ButtonToolbar>
                            </Panel.Body>
                            <EditApartment onShow = {this.state.showEdit} onEdit = {this.editApartment} 
                            onEditModal={()=>{this.showEditModal(this.state.currentlyEditing)}} 
                            currentlyEditing={this.state.currentlyEditing}
                                apartment = {apartments[this.state.currentlyEditing]} />
                        </Panel>
                    ))}
                </PanelGroup>
                <Button bsStyle="primary" onClick={this.showAddModal}>Add Apartment</Button>
                <AddApartment onShow={this.state.showAdd} onAdd={this.addApartments} onAddModal={this.showAddModal} />
            </div>
        );
    }
};


ReactDOM.render(<Recipe />, document.getElementById('app'));
//registerServiceWorker();
