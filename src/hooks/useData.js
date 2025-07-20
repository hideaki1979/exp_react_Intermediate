import { useState, useEffect } from "react";

export function useData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("useEffect発火しました！");
        // APIから情報を取得し、jsの形に変換する（json()というおまじないを使う）
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
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
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        // 実行させる
        fetchData();
    }, []);

    // ここで他のページで呼ぶために
    // useStateの[data, setData]のdataを記述すると、
    // 他のページで呼び出すことが出来ます。
    return { data, loading, error };

}