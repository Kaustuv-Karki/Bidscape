import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setToken(data.token);
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = () => {
    console.log(localStorage.getItem("token"));
  };

  console.log("Token", token);
  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="border border-black py-2 px-10"
          type="text"
          placeholder="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          className="border border-black py-2 px-10"
          type="text"
          placeholder="password"
          name="password"
          onChange={handleChange}
          value={password}
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
          Submit
        </button>
      </form>
      <button onClick={getToken}>GET TOKEn</button>
    </>
  );
}

export default App;
