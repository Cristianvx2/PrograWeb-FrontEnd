import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import {PanelGroup,Panel,Button,ButtonToolbar,ListGroup,ListGroupItem} from 'react-bootstrap';

class Recipe extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        recipes: [
          {name: "Banana Smoothie", ingredients: ["2 bananas", "1/2 cup vanilla yogurt", "1/2 cup skim milk", "2 teaspoons honey", "pinch of cinnamon"]},
          {name: "Spaghetti", ingredients: ["Noodles", "Tomato Sauce", "Meatballs"]},
          {name: "Split Pea Soup", ingredients: ["1 pound split peas", "1 onion", "6 carrots", "4 ounces of ham"]}
        ]
      };
    }
    render() {
      const recipes = this.state.recipes;
      return(
        <div className="jumbotron">
          <h1>RECIPE BOX</h1>
          <PanelGroup accordion id="recipes">
            {recipes.map((recipe, index) => (
              <Panel eventKey={index} key={index}>
                <Panel.Heading>
                  <Panel.Title className="title" toggle>{recipe.name}</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  <ListGroup>
                    {recipe.ingredients.map((ingredient, index) => (
                      <ListGroupItem key={index}>{ingredient}</ListGroupItem>
                    ))}
                  </ListGroup>
                  <ButtonToolbar>
                    <Button bsStyle="warning">Edit</Button>
                    <Button bsStyle="danger">Delete</Button>
                  </ButtonToolbar>
                </Panel.Body>
              </Panel>
            ))}
          </PanelGroup>
          <Button bsStyle="primary">Add Recipe</Button>
        </div>
      );
    }
  };
  //ReactDOM.render(<recipeBox />, document.getElementById('app'));