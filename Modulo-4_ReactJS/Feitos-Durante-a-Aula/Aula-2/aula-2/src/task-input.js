function TaskInput(props) {
    const { handleTaskInputOnChange, taskInput, addTask, delTask } = props;
    return (
      <>
        <input
          id="task-description"
          placeholder="Tarefa"
          onChange={handleTaskInputOnChange}
          value={taskInput}
        />
        <button style={{margin: "0.5em"}} onClick={addTask}>Adicionar</button>
        <button style={{margin: "0.5em"}} onClick={delTask}>Deletar</button>
      </>
    );
  }
  
  export default TaskInput;
  