import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import credentials from './credentials';
import petfinder from './petfinder-client';
import './reset.css'
import './style.css'
import logo from './adopt-me.png'
import Pet from './Pet'
import store from './store'
import SearchControls from './SearchControls'

const pf = petfinder(credentials)

class App extends Component {
  state = {
    animal: 'dog',
    breed: 'Havanese',
    location: 'San Francisco, CA',
    pets: []
  };

  componentDidMount () {
    this.search()
  }

  search () {
    const { animal, breed, location } = this.state
    const promise = pf.pet.find({animal, breed, location, output: 'full'})
    promise.then((data) => {
       let pets = data.petfinder.pets ? data.petfinder.pets.pet : []
       pets = Array.isArray(pets) ? pets : [pets]
       this.setState({ pets });
    })
  }

  changeBreed = breed => {
    this.setState({ breed }, () => this.search()) // handle asynchrony of setState
  }

  changeAnimal = animal => {
    this.setState({ animal, breed: ''}, () => this.search())
  }

  render() {
    return (
      <div className='app'>
      <img src={logo} alt='adopt-me logo' />
      <SearchControls breed={this.state.breed} animal={this.state.animal}  changeBreed={this.changeBreed} changeAnimal={this.changeAnimal}/>
      <div>
        {this.state.pets.map(pet => <Pet key={pet.id} pet={pet} />)}
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ breed: state.breed })
const ConnectedApp = connect(mapStateToProps)(App);
const ProvidedApp = (props) => <Provider store={store}><ConnectedApp /></Provider>

export default App;
