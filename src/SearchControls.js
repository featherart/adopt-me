import React, { Component } from 'react'
import petfinder from './petfinder-client'

const pf = petfinder()

class SearchControls extends Component {
  state = {
    breeds: []
  }

  componentDidMount () {
    this.getNewBreeds(this.props.animal)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.animal !== this.props.animal) {
      this.getNewBreeds(nextProps.animal);
    }
  }

  getNewBreeds (animal) {
    pf.breed.list({animal})
      .then(data => {
        if (data.petfinder.breeds) {
          this.setState({breeds: data.petfinder.breeds.breed})
        }
      })
  }

  handleBreedChange = (e) => {
    this.props.changeBreed(e.target.value)
  }

  render () {
    const breedSelector = !this.props.animal ? null : (
      <select value={this.props.breed}>
        <option value=''></option>
        {this.state.breeds.map(breed => <option key={breed} value={breed}>{breed}</option>)}
      </select>
    )
    return (
      <div className='search'>
        <select value={this.props.animal} onChange={this.handleAnimalChange}>

          {this.state.breeds.map(breed => <option key={breed} key={breed} />)}

        </select>
        {breedSelector}
      </div>
    );
  }
}

export default SearchControls
