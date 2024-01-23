import './App.css'
import { Link } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import VmTerminalComponent from './components/VmTerminalComponent';

function App() {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return <div>Loading ...</div>
  }

  return (
    <div>
      <h1>Keycloak Auth</h1>

      <ul>
        <li>
          <Link to={"/public"}>Public Page</Link>
        </li>

        <li>
          <Link to={"/protected"}>Protected Page</Link>
        </li>

        {!keycloak.authenticated &&
          <button onClick={() => keycloak.login()}>Login</button>
        }

        {keycloak.authenticated &&
          <div>
            <button onClick={() => keycloak.logout()}>Logout ({keycloak.tokenParsed.preferred_username})</button>
            <VmTerminalComponent token={keycloak.token}/>
          </div>
        }
        {console.log(keycloak.token)}

      </ul>
    </div>

  )
}

export default App
