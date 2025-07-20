import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

// ▼ styled-components スタイル定義
const Container = styled.div`
    max-width: 768px;
    margin: 40px auto;
    padding: 24px;
    background: #101094;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(255, 255, 128, 0.8);
`;

const Title = styled.h2`
    font-size: 24px;
    margin-bottom: 24px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const Group = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Label = styled.label`
    font-weight: bold;
    text-align: left;
`;

const Select = styled.select`
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const RadioGroup = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
`;

const CheckboxGroup = styled.div`
    display: flex;
    gap: 12px;
`;

const Input = styled.input`
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const Button = styled.button`
    padding: 12px;
    background-color: #8787C9;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #3f3fa9;
    }
`;

const ErrorText = styled.p`
    color: #e03131;
    font-size: 14px;
`;

const Result = styled.pre`
    background-color: #f1f3f5;
    color: #3a3a3a;
    padding: 16px;
    border-radius: 8px;
    margin-top: 20px;
`;

export default function SurveyForm() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            age: "",
            gender: "",
            services: [],
            otherServices: ""
        }
    });

    const [result, setResult] = useState(null);

    const onSubmit = (data) => {
        const formatted = {
            age: data.age,
            gender: data.gender,
            services: data.services.includes("その他")
                ? [...data.services.filter(s => s !== "その他"), data.otherServices]
                : data.services
        };
        setResult(formatted);
    };

    const selectedServices = watch("services");
    const showOther = selectedServices.includes("その他");

    return (
        <Container>
            <Title>アンケートフォーム</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {/* 年齢 */}
                <Group>
                    <Label>年齢</Label>
                    <Select
                        {...register("age", { required: "年齢を選択してください" })}
                    >
                        <option value="">選択してください</option>
                        <option value="10代">10代</option>
                        <option value="20代">20代</option>
                        <option value="30代">30代</option>
                        <option value="40代">40代</option>
                        <option value="50代">50代</option>
                        <option value="60代以上">60代以上</option>
                    </Select>
                    {errors.age && <ErrorText>{errors.age.message}</ErrorText>}
                </Group>

                {/* 性別 */}
                <Group>
                    <Label>性別</Label>
                    <RadioGroup>
                        <label>
                            <input
                                type="radio"
                                value="男性"
                                {...register("gender", { required: "性別を選択してください" })}
                            />
                            男性
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="女性"
                                {...register("gender")}
                            />
                            女性
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="その他"
                                {...register("gender", { required: "性別を選択してください" })}
                            />
                            その他
                        </label>
                    </RadioGroup>
                    {errors.gender && <ErrorText>{errors.gender.message}</ErrorText>}
                </Group>

                {/* 利用サービス */}
                <Group>
                    <Label>利用したことがあるサービス（複数選択可）</Label>
                    <CheckboxGroup>
                        <label>
                            <input
                                type="checkbox"
                                value="Netflix"
                                {...register("services", { required: "1つ以上選択してください" })}
                            />
                            Netflix
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Amazon Prime"
                                {...register("services", { required: "1つ以上選択してください" })}
                            />
                            Amazon Prime
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Disney+"
                                {...register("services", { required: "1つ以上選択してください" })}
                            />
                            Disney+
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="その他"
                                {...register("services", { required: "1つ以上選択してください" })}
                            />
                            その他
                        </label>
                    </CheckboxGroup>
                    {errors.services && <ErrorText>{errors.services.message}</ErrorText>}

                    {/* その他の入力欄  */}
                    {showOther && (
                        <Input
                            type="text"
                            placeholder="サービス名を入力"
                            {...register("otherServices", { required: "その他サービスを入力してください" })}
                        />
                    )}
                    {showOther && errors.otherServices && <ErrorText>{errors.otherServices.message}</ErrorText>}
                </Group>

                <Button type="submit">送信</Button>
            </Form>

            {/* 結果表示 */}
            {result && (
                <Result>{JSON.stringify(result, null, 2)}</Result>
            )}
        </Container>
    );
};