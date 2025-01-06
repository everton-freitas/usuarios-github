import { Header } from '../../components/Header'
import github from "../../assets/github.png";
import ItemList from '../../components/ItemList';
import './styles.css'
import { useState } from 'react';
function App() {
  const [user, setUser] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [repos, setRepos] = useState(null)

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`)
    const newUser = await userData.json();

    console.log(newUser)
    if (newUser.name) {
      const { avatar_url, name, bio, login } = newUser
      setCurrentUser({ avatar_url, name, bio, login })

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`)
      const newRepos = await reposData.json();


      if (newRepos.length) {
        setRepos(newRepos)
      }
    }
  }




  return (
    <div className="App">
      <Header></Header>
      <div className='conteudo'>
        <img src={github} className='background' alt='foto github'></img>
        <div className='info'>
          <div className='input-button'>
            <input name='Usuario' value={user} onChange={event => setUser(event.target.value)} placeholder='@username'></input>
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser?.name ? (
            <>
              <div className='info-usuario'>
                <img src={currentUser.avatar_url} alt='foto perfil'></img>
                <div className='descricao-usuario'>
                  <div>
                    <h3>{currentUser.name}</h3>
                    <h5>@{currentUser.login}</h5>
                  </div>
                  <div>
                    <h5>{currentUser.bio}</h5>
                  </div>
                </div>
              </div>
              <hr className='hr'></hr>
            </>
          ) : <h4 className='pesquise'>Pesquise o nome de algum usuario do github.</h4>}
          {repos?.length ? (
            <div className='repos'>
              <h4 className='repositorio'>Repositorios</h4>
              {repos.map(repo => (
                <ItemList title={
                  <a href={`https://github.com/${currentUser.login}/${repo.name}`} target='_black'>{repo.name}</a>
                }  description={repo.description}></ItemList>
              ))}
            </div>
          ) : null}

        </div>
      </div>
    </div>
  );
}

export default App;
