import { createContext } from 'react';
import Store from './store/store';
import Main from './pages/Main';

interface IStore
{
  store: Store;
}
const store = new Store();

export const Context = createContext<IStore>(
  {
    store
  }
);
function App()
{


  return (
    <Context.Provider value={{
      store
    }}>
      <Main />
    </Context.Provider>
  );
}

export default App;
