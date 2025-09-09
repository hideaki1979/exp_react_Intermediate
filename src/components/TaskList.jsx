import { memo } from "react"
import { TaskItem } from "./TaskItem"
import styled from "styled-components";

const List = styled.div`
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;


const TaskList = memo(({ tasks, removeTask, addSubtask, toggleTask }) => {
    return (
        <List>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    removeTask={removeTask}
                    addSubtask={addSubtask}
                    toggleTask={toggleTask}
                />
            ))}
        </List>
    )
});

export default TaskList