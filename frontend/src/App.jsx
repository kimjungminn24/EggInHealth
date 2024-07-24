// src/App.jsx
import React from 'react';
import useStore from './store';

function App() {
    const { count, increment, decrement } = useStore();

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
}

export default App;
