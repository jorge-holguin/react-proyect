import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';
import React from 'react';
import { useLocalStorage } from './useLocalStorage';

// const defaultTodos = [
//   {text: 'Cortar cebolla', completed: true },
//   {text: 'Tomar el Curso de Intro a React.js', completed: false },
//   {text: 'Llorar con la Llorona', completed: false },
//   {text: 'LALALALA', completed: false },
//   {text: 'Usar estados derivados', completed: true},
// ];

// localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos));

// localStorage.removeItem('TODOS_V1');

function App() {
  
  const {
    item: todos, 
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V1', [] );
  const [searchValue, setSearchValue] = React.useState('');

  const completedTodos = todos.filter( todo => !!todo.completed).length;
  const totalTodos = todos.length;


  console.log ('Log 1');
  React.useEffect ( () => {console.log ('Log 2')});
  console.log ('Log 3');
  const searchedTodos = todos.filter(
    todo => {
      const todoText = todo.text.toLocaleLowerCase();
      const searchText = searchValue.toLowerCase();

      return todoText.includes(searchText);
    }
  );
    
  const completeTodo = (text) => {
    const newTodos = [...todos];// copia del estado de los todos
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text == text
    );
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  }

  const deleteTodo = (text) => {
    const newTodos = [...todos];// copia del estado de los todos
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text == text
    );
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  }
  return (
    <React.Fragment> 
      <TodoCounter completed={completedTodos} total={totalTodos} />
      <TodoSearch searchValue = {searchValue}
        setSearchValue = {setSearchValue}
      />
        
      <TodoList>
        {loading && <p>Estamos cargando...</p>}
        {error && <p>Desespérate, hubo un error!!</p>}
        {(!loading && searchedTodos.length === 0) && <p>Crea tu primer TODO! </p>}
        {searchedTodos.map(todo => (
          <TodoItem 
            key={todo.text} 
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>

      <CreateTodoButton />
    </React.Fragment> 
  );
}


export default App;
