import { memo, useState } from "react"
import styled from "styled-components";

const Card = styled.div`
    padding: 16px;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h3`
    margin: 0 0 8px 0;
    color: #333;
`;

const SubtaskInputArea = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 16px;
`;

const Input = styled.input`
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 0.9rem;
`;

const Button = styled.button`
    padding: 8px 16px;
    background: #d73169;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: bold;

    &:hover {
        background: #ec407a;
    }
`;

const SubtaskList = styled.ul`
    margin-top: 16px;
    padding-left: 16px;
`;

const Subtask = styled.li`
    color: #111;
    list-style: none;
    margin-bottom: 8px;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
    appearance: none;
    width: 24px;
    height: 24px;
    border: 2px solid #4a90e2;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;

    &:checked {
        background-color: #4a90e2;
        border-color: #4a90e2;
    }

    &:checked::after {
        content: "✔";
        color: #fff;
        font-size: 12px;
        position: absolute;
        left: 5px;
        top: 3px;
    }

    &:hover {
        border-color: #357abd;
    }
`;

export const TaskItem = memo(({ task, removeTask, addSubtask, toggleTask }) => {
    const [subtaskText, setSubtaskText] = useState("");

    const handleAddSubtask = () => {
        if (!subtaskText.trim()) return;
        addSubtask(task.id, subtaskText);
        setSubtaskText("");
    }

    return (
        <Card>
            <label>
                <Checkbox
                    name="completed"
                    id={`completed-${task.id}`}
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                />
                <Title>{task.title}</Title>
            </label>
            <Button
                onClick={() => removeTask(task.id)}
            >
                削除
            </Button>

            <SubtaskInputArea>
                <Input
                    type="text"
                    placeholder="サブタスクを入力"
                    value={subtaskText}
                    onChange={(e) => setSubtaskText(e.target.value)}
                />
                <Button
                    onClick={handleAddSubtask}
                >
                    サブタスク追加
                </Button>
            </SubtaskInputArea>
            {task.subtasks.length > 0 && (
                <SubtaskList>
                    {task.subtasks.map((sub) => (
                        <Subtask key={sub.id}>{sub.title}</Subtask>
                    ))}
                </SubtaskList>
            )}
        </Card>
    )
})
