// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.searchedText = "" // Initialisation de notre donnée searchedText en dehors du state
    this.state = {
      films: [],
      isLoading: false
    }
    this.searchedText = ""
  }

  _loadFilms() {
    if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
      this.setState({ isLoading : true})// Lancement du du chargment
      getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
          this.setState({
            films: data.results,
            isLoading: false // Arrêt du chargement
           })
      })
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
  }


  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
          {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
        </View>
      )
    }
  }

  render() {
  console.log("RANDER");
  return (
    <View style={styles.main_container}>
      <TextInput
        style={styles.textinput}
        placeholder='Titre du film'
        onChangeText={(text) => this._searchTextInputChanged(text)}
        onSubmitEditing={() => this._loadFilms()}
      />
      <Button title='Rechercher' onPress={() => this._loadFilms()}/>
      <FlatList
        data={this.state.films}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <FilmItem film={item}/>}
      />
      {this._displayLoading()}
    </View>
  )
}
}


const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 24
  },
  textinput: {
    marginLeft: 0.5,
    marginRight: 0.5,
    height: 40,
    borderColor:'#000000',
    borderWidth: 0.5,
    paddingLeft: 5,
  },

  loading_container: {
   position: 'absolute',
   left: 0,
   right: 0,
   top: 100,
   bottom: 0,
   alignItems: 'center',
   justifyContent: 'center'
 }
})



export default Search
