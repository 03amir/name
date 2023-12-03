import React from 'react';
import  ReactDOM  from 'react-dom/client';
import Board from './components/Board';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import  store  from './utils/store';


function App(props) {
    return (
        <Provider store={store}>
        < ChakraProvider>
            <Board/>
        </ChakraProvider >
        </Provider>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
