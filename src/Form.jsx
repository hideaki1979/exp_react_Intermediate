import React, { useState } from 'react'

const Form = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleNameChange = (event) => {
        console.log(event, "中身チェック");
        setName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    return (
        <div>
            <div>
                <p>名前を入力してください</p>
                <input type="text" value={name} onChange={handleNameChange} />
            </div>
            <div>
                <p>メールアドレスを入力してください</p>
                <input type="text" value={email} onChange={handleEmailChange} />
            </div>
            <hr />
            <p>入力した名前： {name}</p>
            <p>入力したメールアドレス： {email}</p>
        </div>
    )
}

export default Form