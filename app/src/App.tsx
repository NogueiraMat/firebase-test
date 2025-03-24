import { useState } from "react";
import { auth } from "./config/firebase";
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function App() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, user, pass);
    } catch (err) {
      console.error(err);
    };
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, user, pass);
    } catch (err) {
      console.error(err);
    };
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    };
  };

  console.log(auth?.currentUser?.email);
  
  return (
    <div style={{ display: "flex", width: "100%", gap: "12px", padding: "24px", flexWrap: "nowrap" }}>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label>User</label>
        <input value={user} onChange={(e) => setUser(e.target.value)}/>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label>Password</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)}/>
      </div>

      <button onClick={signUp}>Sign up...</button>
      <button onClick={signIn}>Sign in...</button>
      <button onClick={signOutUser}> Sign out...</button>
      <button onClick={() => console.log(auth?.currentUser)}> Current email...</button>
    </div>
  );
};

export default App;
