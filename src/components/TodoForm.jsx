import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";

// ▼ スタイル定義
const Container = styled.div`
    max-width: 1024px;
    padding: 32px;
    background: #6a6c6e;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.8);
    gap: 24px;
    margin-top: 24px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    `;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    margin-bottom: 16px;
`;

const Label = styled.label`
    font-size: 16px;
    font-weight: bold;
    text-align: left;
`;

const Input = styled.input`
    padding: 12px;
    border: 1px solid #858788;
    border-radius: 8px;
    font-size: 16px;

    &:focus {
        outline: none;
        border-color: #228be6;
        box-shadow: 0 0 0 2px rgba(34, 139, 230, 0.2);
    }
`;

const ErrorText = styled.p`
    color: #e03131;
    margin-top: 4px;
    font-size: 14px;
    text-align: left;
`;

const SubtaskRow = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
`;

const Button = styled.button`
    padding: 12px 16px;
    background-color: #228be6;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #1c7ed6;
    }
`;

const RemoveButton = styled.button`
    background: #fa5252;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    padding: 12px 16px;
`;

const TaskCard = styled.div`
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    padding: 24px;
    margin-top: 20px;
    border-radius: 12px;
`;

const TaskHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    strong {
        font-size: 18px;
        color: #000;
    }
`;

const SubtaskList = styled.ul`
    margin: 12px 0 0;
    color: #495057;
    padding-left: 16px;
    list-style-type: disc;
    text-align: left;

    li {
        margin-bottom: 8px;
    }
`;

const SectionTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 24px;
    text-align: center;
`;

const TodoForm = () => {

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            taskName: "",
            subtasks: [{ name: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "subtasks"
    });

    const [taskList, setTaskList] = useState([]);

    const onSubmit = (data) => {
        setTaskList((prev) => [...prev, { ...data, id: Date.now() }]);
        reset();
    }

    const removeTask = (index) => {
        setTaskList((prev) => prev.filter((_, i) => i !== index))
    }

    return (
        <Container>
            <SectionTitle>TODOアプリ</SectionTitle>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label>タスク名</Label>
                    <Input
                        type="text"
                        {...register("taskName", { required: "タスク名は必須です" })}
                    />
                    {errors.taskName && <ErrorText>{errors.taskName.message}</ErrorText>}
                </FormGroup>
                <FormGroup>
                    <Label>サブタスク</Label>
                    {fields.map((field, index) => (
                        <div key={field.id} style={{ marginBottom: '16px' }}>

                            <SubtaskRow>
                                <Input
                                    type="text"
                                    placeholder={`サブタスク ${index + 1}`}
                                    {...register(`subtasks.${index}.name`, {
                                        required: "サブタスク名は必須です"
                                    })}
                                />
                                <RemoveButton
                                    type="button"
                                    onClick={() => remove(index)}
                                >
                                    削除
                                </RemoveButton>
                            </SubtaskRow>
                            {errors.subtasks?.[index]?.name && <ErrorText>{errors.subtasks?.[index]?.name.message}</ErrorText>}
                        </div>
                    ))}
                    <Button
                        type="button"
                        onClick={() => append({ name: "" })}
                    >
                        + サブタスク追加
                    </Button>
                </FormGroup>

                <Button type="submit">
                    タスク追加
                </Button>
            </Form>

            {/* 登録済みタスク表示 */}
            {taskList.length > 0 && (
                <div style={{ marginTop: '40px' }}>
                    <SectionTitle>タスク一覧</SectionTitle>
                    {taskList.map((task, idx) => (
                        <TaskCard key={idx}>
                            <TaskHeader>
                                <strong>{task.taskName}</strong>
                                <RemoveButton onClick={() => removeTask(idx)}>
                                    タスク削除
                                </RemoveButton>
                            </TaskHeader>
                            {task.subtasks && task.subtasks.length > 0 &&
                                task.subtasks.some(sub => sub.name) && (
                                    <SubtaskList>
                                        {task.subtasks.map((sub, i) => (
                                            sub.name && <li key={i}>{sub.name}</li>
                                        ))}
                                    </SubtaskList>
                                )}
                        </TaskCard>
                    ))}
                </div>
            )}
        </Container>
    );
}

export default TodoForm;