import { useState } from "react";
import Form from "../Form";
import Test from "../Test";
import { useData } from "../hooks/useData";

const Home = () => {
    // const [count, setCount] = useState(0)
    const [oohori, setOohori] = useState("長野で研究しています");
    const [num, setNum] = useState(0);
    const [omikuji, setOmikuji] = useState(0);

    const random = () => {
        setOmikuji(Math.floor(Math.random() * 5)); // 0〜４の数値がランダム出力
    }

    // useEffectとどっちが早いか確認
    console.log("画面起動しました！");

    const { data, loading, error } = useData();

    return (
        <>
            {loading && (
                <div>データを取得中...</div>
            )}

            {error && (
                <div style={{ color: 'red' }}>
                    <p>⚠️ エラー: {error}</p>
                </div>
            )}

            {!loading && !error && data.length > 0 && (
                <>
                    <h1>初級のおさらい</h1>
                    {data.map((item) => (
                        <div key={item.id}>
                            <p>{item.title}</p>
                        </div>
                    ))}

                    <Form />

                    <Test zz='ジーズの授業中です！' />

                    <h2>{oohori}</h2>
                    <button onClick={() => setOohori("あああああ")}>
                        押したらどうなるか
                    </button>

                    <h3>{num}</h3>
                    <button onClick={() => setNum((prev) => prev + 1)}>ボタン</button>

                    {omikuji === 0 && <h1>大吉</h1>}
                    {omikuji === 1 && <h1>中吉</h1>}
                    {omikuji === 2 && <h1>吉</h1>}
                    {omikuji === 3 && <h1>小吉</h1>}
                    {omikuji === 4 && <h1>凶</h1>}

                    <button onClick={random}>おみくじ</button>
                </>
            )}
        </>
    )
}

export default Home