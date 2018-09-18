import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProductItem from './productItem';
import AddProduct from './addProduct';

const products = [
  {
    name: 'iPad',
    price: 200
  },
  {
    name: 'iPhone',
    price: 650
  }
];

localStorage.setItem('products', JSON.stringify(products));

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      products: JSON.parse(localStorage.getItem('products'))
    };

    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }

  componentWillMount(){
    const products = this.getProducts();

    this.setState({products});
  }

  getProducts(){
    //return JSON.parse(localStorage.getItem('products'));
    return this.state.products;
  }

  onClick(){
    alert('Clicked!');
  }

  onMouseEnter(){

  }

  onChange(event){
    console.log(event.target.value);
  }

  onDelete(name){
    const products = this.getProducts();

    const filteredProducts = products.filter(product => {
      return product.name !== name;
    });
    
    this.setState({ products: filteredProducts });
  }

  onAdd(name, price){
    const products = this.getProducts();

    products.push({
      name,
      price
    });

    
    this.setState({ products });
    
  }


  render() {
    const list = [
      'Item 1',
      'Item 2',
      'Another item'
    ];


    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
       
        <h1>Products Manager</h1>
        <AddProduct
          onAdd={this.onAdd}
        />

        {
          this.state.products.map(product => {
            return(
              <ProductItem
                key={product.name}
                {...product}
                onDelete={this.onDelete}
              />
            );
          })
        }
        <h1>
          {
            list.map(item => {
              return(
                <div key={item} onClick={this.onClick}>{item}</div>
              );
            })
          }
        </h1>
          <input onChange={this.onChange}/>
      </div>
    );
  }
}

export default App;
