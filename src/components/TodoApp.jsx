import { useCallback, useMemo, useState } from "react"
import TaskList from "./TaskList";
import styled from "styled-components";

// ▼ styled-components スタイル定義
const Container = styled.div`
    max-width: 768px;
    margin: 40px auto;
    padding: 24px;
    background: #373737;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 24px;
    color: #6db7dc;
`;

const InputArea = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
`;

const Input = styled.input`
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    line-height: 1.5;
`

const Button = styled.button`
    padding: 8px 16px;
    background: #295f83;
    color: white;
    font-size: 0.85rem;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        background: #3a9fd9;
    }
`;

const Stats = styled.p`
    font-size: 0.9rem;
    color: #ddc1c1;
    text-align: right;
`;

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState("");

    // ✅ タスク追加（useCallbackでメモ化）
    const addTask = useCallback(() => {
        if (!text.trim()) return;

        setTasks((prev) => [
            ...prev,
            {
                id: new Date().toLocaleString("ja-JP"),
                title: text,
                completed: false,
                subtasks: []
            }
        ]);
        setText("");
    }, [text]);

    // ✅ タスク削除
    const removeTask = useCallback((id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    }, []);

    // ✅ サブタスク追加
    const addSubtask = useCallback((taskId, subtaskTitle) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId
                    ? {
                        ...task,
                        subtasks: [
                            ...task.subtasks,
                            { id: new Date().toLocaleString("ja-JP"), title: subtaskTitle, completed: false },
                        ],
                    }
                    : task
            ));
    }, []);

    // ✅ 完了・未完了タスク数をuseMemoで計算
    const completedCount = useMemo(
        () => tasks.filter((t) => t.completed).length,
        [tasks]
    );

    const incompleteCount = useMemo(() => {
        return tasks.filter((t) => !t.completed).length
    }, [tasks]);

    // 完了状態切り替え
    const toggleTask = useCallback((id) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    }, []);

    return (
        <Container>
            <Title>✅ TODOアプリ（サブタスク付き）</Title>
            <InputArea>
                <Input
                    type="text"
                    placeholder="タスクを入力"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Button
                    onClick={addTask}
                >
                    追加
                </Button>
            </InputArea>

            <Stats>
                完了：{completedCount} / 未完了：{incompleteCount}
            </Stats>

            <TaskList
                tasks={tasks}
                removeTask={removeTask}
                addSubtask={addSubtask}
                toggleTask={toggleTask}
            />
        </Container>
    )
}

export default TodoApp