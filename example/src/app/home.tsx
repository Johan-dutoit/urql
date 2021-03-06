/* tslint:disable */

import React from 'react';
import { Connect, query, mutation } from '../../../src/index';
import TodoList from './todo-list';
import TodoForm from './todo-form';
import Loading from './loading';

const Home = () => (
  <Connect
    query={query(TodoQuery)}
    mutation={{
      addTodo: mutation(AddTodo),
      removeTodo: mutation(RemoveTodo),
    }}
    children={({ loaded, data, addTodo, removeTodo, refetch }) => {
      return (
        <div>
          {!loaded ? (
            <Loading />
          ) : (
            <TodoList todos={data.todos} removeTodo={removeTodo} />
          )}
          <TodoForm addTodo={addTodo} />
          <button type="button" onClick={refetch}>
            Refetch
          </button>
          <button
            type="button"
            onClick={refetch.bind(null, { skipCache: true })}
          >
            Refetch (Skip Cache)
          </button>
        </div>
      );
    }}
  />
);

const AddTodo = `
mutation($text: String!) {
  addTodo(text: $text) {
    id
    text
  }
}
`;

const RemoveTodo = `
mutation($id: ID!) {
  removeTodo(id: $id) {
    id
  }
}
`;

const TodoQuery = `
query {
  todos {
    id
    text
  }
  user {
    name
  }
}
`;

export default Home;
