import React from 'react';
import ReactDOM from 'react-dom';
import recipeBox from './recipeBox';
import {PanelGroup, Panel, Button, ButtonToolbar,ListGroup,ListGroupItem} from 'react-bootstrap';
import {AddApartment} from './components/addApartment';
import './css/index.css';
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';

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
            showAdd: false
        };
        this.showAddModal = this.showAddModal.bind(this);
        this.addApartments = this.addApartments.bind(this);
    }
    //show the new recipe modal
    showAddModal(){
        this.setState({showAdd: !this.state.showAdd});
    }
    //create new apartment
    addApartments(apartment){
        let apartments = this.state.apartments;
        apartments.push(apartment);
        this.setState({apartments: apartments});
        this.showAddModal();
    }

    render(){
        const apartments = this.state.apartments;
        return(
            <div className="jumbotron">
                <h1>APARTMENTS FOR RENT</h1>
                <PanelGroup accordion id="recipes">
                    {apartments.map((apartments, index) =>(
                        <Panel eventKey={index} key={index}>
                            <Panel.Heading>
                                <Panel.Title className="title" toggle>{apartments.name}</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                                <ListGroup>
                                    {
                                        apartments.parts.map((parts, index) => (
                                            <ListGroupItem key = {index}>{parts}</ListGroupItem>
                                        ))
                                    }
                                </ListGroup>
                                <ButtonToolbar>
                                    <Button bsStyle="warning">Edit</Button>
                                    <Button bsStyle="danger">Delete</Button>
                                </ButtonToolbar>
                            </Panel.Body>
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
