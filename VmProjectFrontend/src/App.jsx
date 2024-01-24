import './App.css'
import { Link } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import VmTerminalComponent from './components/VmTerminalComponent';
import HeroComponent from './components/HeroComponent';
import PythonTerminalComponent from './components/PythonTerminalComponent';

function App() {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return <div>Loading ...</div>
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='top-0 mt-10 '>
        <HeroComponent />
        <div className='flex flex-row space-x-2 justify-center'>
          {!keycloak.authenticated &&
            <button className="bg-green-700 w-44" onClick={() => keycloak.login()}>Login</button>
          }

          {keycloak.authenticated &&
            <button className="bg-red-700 w-44" onClick={() => keycloak.logout()}>Logout ({keycloak.tokenParsed.preferred_username})</button>
          }

          <Link to="/public">
            <button className="bg-sky-900 w-44 text-white">Public Page</button>
          </Link>

          {keycloak.authenticated &&
            <Link to="/public">
              <button className="bg-sky-900 w-44 text-white">Protected Page</button>
            </Link>
          }
        </div>
      </div>

      <div className='flex justify-center w-screen'>
        <div className='w-1/2 mx-16'>
          {keycloak.authenticated &&
            <VmTerminalComponent token={keycloak.token} />
          }
        </div>

        <div className='w-1/2 mx-16'>
          {keycloak.authenticated &&
            <PythonTerminalComponent token={keycloak.token} />
          }
        </div>
      </div>

    </div>

  )
}

export default App
