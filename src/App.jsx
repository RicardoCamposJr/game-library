/* eslint-disable react/jsx-no-comment-textnodes */
import { useState } from 'react'
import Game from './components/Game'

export default function App() {

  //Função realizada ao clicar no botão de adicionar game:
  function handleSubmit(ev) {
    ev.preventDefault()
    addGame({ title, cover })
    //Limpando o input após o botão ser clicado:
    setTitle("")
    setCover("")
  }

  //Função que recebe o game obtido dos inputs, cria um id e adiciona à lista de games através do setGames:
  function addGame( {title, cover }) {
    const id = Math.floor(Math.random() * 1000000)

    const game = { 
      title,
      cover,
      id 
    }
    
    //Separando os games na lista de games atual e adicionando o game que acabou de
    // ser atribuído ao  final da lista.
    setGames((games) => {
      const newState = [...games, game]

      //A variável acima foi criada pensando em armazenar a lista no localStorage,
      // pois, para isso, é preciso colocar a lista para string, desse modo:
      localStorage.setItem("obc-game-lib", JSON.stringify(newState))

      //Agora, retorna-se a lista de games:
      return newState
    })
  }

  //Função que remove o game da lista de games recebendo o id:
  function removeGame(id) {
    //Precisa usar o setGames pois é uma modificação no estado da página.
    //Aqui, uso o filter para filtrar todos os games que não possuem o id recebido,
    // restando assim, somente os games que devem permanecer, sem o game que o id foi recebido pela função.
    setGames(state => {
      const newState = state.filter(game => game.id !== id)
      localStorage.setItem("obc-game-lib", JSON.stringify(newState))

      return newState
    })
  }

  //Estado dos inputs:
  const [title, setTitle] = useState("")
  const [cover, setCover] = useState("")

  //Estado da lista de games:
  //Aqui, nós precisamos colocar a primeira renderização da página para pegar
  // a lista de games no localStorage do navegador, assim, segue a lógica:
  const [games, setGames] = useState(() => {
    const storedGames = localStorage.getItem("obc-game-lib")
    //Esse if serve para verificar se já há alguma lista de games no localStorage.
    //Se não tiver, retorna um Array vazio, se tiver, retorna a lista. Para isso, precisa
    // converter ela de string para um array novamente através do JSON.parse.
    if (!storedGames) {return []}
    return JSON.parse(storedGames)
  })

  return (
    <div id="app">
      <h1>Biblioteca de Games</h1>
      {/* No forms é necessário atribuir a ação que será realizada nele, nesse caso,
      a ação de Submit:*/}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input 
            type="text" 
            name="title" 
            id="title" 
            //Atribuindo os states para as mudanças quando o botão de adicionar é clicado:
            value={title}
            //Atribuindo um novo valor quando o valor atual do input mudar:
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cover">Capa:</label>
          <input 
            type="text" 
            name="cover" 
            id="cover" 
            //Atribuindo os states para as mudanças quando o botão de adicionar é clicado:
            value={cover}
            //Atribuindo um novo valor quando o valor atual do input mudar:
            onChange={(e) => setCover(e.target.value)}
          />
        </div>
        <button type="submit">Adicionar à Biblioteca</button>
      </form>
      <div className="games">
        {games.map( (game) => (
          <Game 
            key={game.id}
            title={game.title}
            cover={game.cover}
            //Deve ser uma função de callback!!
            onRemove={() => removeGame(game.id)}
          />
        ))}
      </div>
    </div>
  )
}