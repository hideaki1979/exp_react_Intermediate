import { useCallback, useEffect, useRef, useState } from 'react'
import styled from "styled-components";

// ▼ styled-components スタイル定義
const Container = styled.div`
    max-width: 768px;
    margin: 40px auto;
    padding: 24px;
    background-color: #969899;
    border-radius: 16px;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 32px;
    margin-bottom: 24px;
`;

const WatchTime = styled.h2`
    font-size: 24px;
    margin-bottom: 24px;
`;

const ButtonSW = styled.button`
    padding: 12px;
    background-color: #2a5f79;
    color: white;
    border-radius: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #448baf;
    }

`

const Stopwatch = () => {
    const [time, setTime] = useState(0) // 経過時間（秒）
    const [isRunning, setIsRunning] = useState(false)   // 動作中か
    const intervalRef = useRef(null)    // setIntervalのID保持

    useEffect(() => {
        // コンポーネントがアンマウントされるときに実行されるクリーンアップ関数
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, []);  // 空の依存配列は、コンポーネントのマウント時とアンマウント時にのみeffectが実行されることを保証します

    // スタート処理
    const handleStart = useCallback(() => {
        if (isRunning) return;  // 既に動いてたら何もしない
        setIsRunning(true);

        intervalRef.current = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);
    }, [isRunning]);

    // ストップ処理
    const handleStop = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsRunning(false);
    }, []);

    // リセット処理
    const handleReset = useCallback(() => {
        handleStop();   // 止めてからリセット
        setTime(0);
    }, [handleStop]);

    return (
        <Container>
            <Title>⏱ ストップウォッチ</Title>
            <WatchTime>{time}秒</WatchTime>

            <ButtonSW onClick={handleStart}>
                スタート
            </ButtonSW>
            <ButtonSW onClick={handleStop}>
                ストップ
            </ButtonSW>
            <ButtonSW onClick={handleReset}>
                リセット
            </ButtonSW>
        </Container>
    )
}

export default Stopwatch