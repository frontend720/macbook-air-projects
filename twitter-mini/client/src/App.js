import './App.css';
import { useContext } from 'react';
import { ThemeContext } from './themeContext';
import Button from "react-materialize/lib/Button"
import Feed from './Feed';
import Filter from './Filter';

function App() {

  const {theme} = useContext(ThemeContext)
  return (
    <div className={`App-${theme}`}>
      <Feed />
      {/* <Filter/> */}
    </div>
  );
}

export default App;
