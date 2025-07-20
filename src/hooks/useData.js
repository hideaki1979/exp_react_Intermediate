import { useState, useEffect } from "react";

export function useData() {
    const [data, setData] = useState([]);

    // useEffectの練習
    useEffect(() => {
        console.log("useEffect発火しました！");
        // APIから情報を取得し、jsの形に変換する（json()というおまじないを使う）
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/todos"
                );
                console.log(response, "取得の確認");
                const data = await response.json();
                console.log(data, "中身の確認");
                // jsの形式に変換したたんすのデータをuseStateに保持しないといけません
                setData(data);
            } catch (error) {
                console.error("Error, fetching JSON data", error);
            }
        }
        // 実行させる
        fetchData();
    }, []);

    // ここで他のページで呼ぶために
    // useStateの[data, setData]のdataを記述すると、
    // 他のページで呼び出すことが出来ます。
    return { data };

}