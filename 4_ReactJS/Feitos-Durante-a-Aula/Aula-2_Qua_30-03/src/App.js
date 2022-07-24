import { useState } from "react";

import TaskInput from "./task-input";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const handleTaskInputOnChange = (e) => {
    setTaskInput(e.target.value);
  };

  const addTask = () => {
    const newTask = { description: taskInput, completed: false };

    setTaskInput("");
    setTasks([...tasks, newTask]);
  };

  const delTask = () => {
    const newTask = { description: taskInput, completed: false };

    setTaskInput("");
    setTasks([tasks.filter(e => e != tasks[tasks.length - 1])]);
  };

  const completeTask = (idxToComplete) => {
    const newTasks = tasks.map((task, idx) => {
      if (idx === idxToComplete) {
        return {
          description: task.description,
          completed: !task.completed
        };
      }

      return task;
    });

    setTasks(newTasks);
  };

  const styles = {
    listStyle: {
      listStyleType: "none"
    },
    itemChekced: {
      textDecoration: "line-through"
    }
  };

  return (
    <main>
      <h1>Lista de tarefas</h1>
      <section>
        <TaskInput
          handleTaskInputOnChange={handleTaskInputOnChange}
          taskInput={taskInput}
          addTask={addTask}
          delTask={delTask}
        />
      </section>
      <section>
        <ul style={styles.listStyle}>
          {tasks.map((task, idx) => (
            <li key={task.description}>
              <input
                type="checkbox"
                onChange={() => completeTask(idx)}
                value={task.completed}
              />
              <span style={task.completed ? styles.itemChekced : null}>
                {task.description}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
