import styles from './App.module.css';
import { Counter } from './counter/Counter';
import { ITunes } from './itunes/Itunes';

function App() {
  return (
    <div className={styles.App}>
      <header className={styles['App-header']}>
       <ITunes />
       <Counter />
      </header>
    </div>
  );
}

export default App;
