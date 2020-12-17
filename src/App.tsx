import logo from './logo.svg';
import styles from './App.module.css';
import { Button } from '@chakra-ui/react';
import { Counter } from './counter/Counter';

function App() {
  return (
    <div className={styles.App}>
      <header className={styles['App-header']}>
       <Button colorScheme="blue">Hello world</Button>
       <Counter />
      </header>
    </div>
  );
}

export default App;
