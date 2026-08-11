interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

// Serie de valores que recibimos para determinar un nuevo estado
export type TaskAction =
  | { type: "ADD_TODO"; payload: string } // Valor o argumento de una acción 'payload'
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number };

// La función siempre debe regresar un estado nuevo basado en los argumentos
// Siempre regresamos el mismo tipo que el primer parámetro
export const tasksReducer = (
  state: TaskState,
  action: TaskAction,
): TaskState => {
  // Evaluamos las acciones para definir qué hacer
  switch (action.type) {
    case "ADD_TODO": {
      // Será de tipo Todo (interface)
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };

      // Retornamos un nuevo arreglo de ToDos, anadiendo el nuevo ToDo
      return {
        ...state,
        todos: [...state.todos, newTodo],
        length: state.todos.length + 1,
        pending: state.pending + 1,
      };
    }

    case "DELETE_TODO": {
      const currentTodos = state.todos.filter(
        (todo) => todo.id != action.payload,
      );
      return {
        ...state,
        todos: currentTodos,
        length: currentTodos.length,
        completed: currentTodos.filter((todo) => todo.completed).length,
        pending: currentTodos.filter((todo) => !todo.completed).length,
      };
    }

    case "TOGGLE_TODO": {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          // Me retorna todos los valores del ToDo actual y el valor opuesto que tiene completed
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      return {
        ...state,
        todos: updatedTodos,
        completed: updatedTodos.filter((todo) => todo.completed).length,
        pending: updatedTodos.filter((todo) => !todo.completed).length,
      };
    }

    default:
      return state;
  }
};
