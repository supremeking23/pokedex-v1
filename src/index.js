import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import './index.css';

// import App from './App';
// import * as serviceWorker from './serviceWorker';

function App(){
  const [pokedex,setPokedex] = useState([])
  const [wildPokemon, setWildPokemon] = useState({})

  useEffect(()=> {
    encounterWildPokemon()
  },[pokedex])

  const pokeId = () => {
    const min = Math.ceil(1)
    const max = Math. floor(151)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const encounterWildPokemon = () => {
    axios
    .get('https://pokeapi.co/api/v2/pokemon/'+pokeId())
    .then(response => {
      //console.log(response.data);
      setWildPokemon(response.data);
    })
  }

 const catchPokemon = (pokemon) => {
   setPokedex(state => {
     const monExists = (state.filter(p => pokedex.id == p.id).length > 0);
     //console.log(state.filter(p => pokedex.id == p.id))
     if(!monExists) {
       state = [...state,pokemon]
       state.sort(function(a,b) {
         return a.id - b.id
       })
     }

     return state
   })

   encounterWildPokemon()
 }


 const releasePokemon = id => {
   setPokedex(state => state.filter (p => p.id != id))
 }

  return(
    <div className="app-wrapper">
      <header>
        <h1 className="title">React Hooks</h1>
        <h3 className="subtitle">With pokemon</h3>
      </header>

      <section className="wild-pokemon">
        <h2>Wild Encounter</h2>
        
        <img className="sprite" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + wildPokemon.id + ".png"} alt={wildPokemon.name}/>
        <h3>{wildPokemon.name}</h3>  
        <button className="catch-btn" onClick={() => catchPokemon(wildPokemon)}>CATCH</button>     
         
      </section>

      <section className="pokedex">
        <h2>Pokedex</h2>
        <div className="pokedex-list">
          {pokedex.map(pokemon =>(
            <div className="pokemon" key={pokemon.id}>
              <img className="sprite" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"} alt={wildPokemon.name}/>
              <h3 className="pokemon-name">{pokemon.name}</h3>
              <button className="remove" onClick={() => releasePokemon(pokemon.id)}>&times;</button>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
