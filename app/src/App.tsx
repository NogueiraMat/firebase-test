interface FetchAnime {
  id: string,
  name: string,
  release_year: string,
  gender: string,
  avaliation: number
}

interface NewAnime {
  name: string
  release_year: string
  gender: string
  avaliation: 0 | 1 | 2 | 3 | 4 | 5
}

interface Avaliation {
  value: 0 | 1 | 2 | 3 | 4 | 5;
}

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { auth, db } from "./config/firebase";
import { 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";

import { addDoc, query, getDocs, collection } from "firebase/firestore";

const AnimeCard = (anime: FetchAnime) => {  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: "240px", height: "300px", padding: "4px", border: "solid 1px white" }}>
      <h1 style={{ color: anime.avaliation <= 2 ? "red" : anime.avaliation > 2 && anime.avaliation < 5 ? "green" : "yellow" }}>{anime.name}</h1>
      <h2>{anime.release_year}</h2>
      <h2>{anime.gender}</h2>
      <h2>Nota {anime.avaliation}</h2>
    </div>
  );
};

function App() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [addAnime, setAddAnime] = useState<NewAnime>({
    name: "",
    release_year: "",
    gender: "",
    avaliation: 0,
  });

  const [animeList, setAnimeList] = useState<FetchAnime[] | []>([]);

  const avaliations: Avaliation[] = [
    {value: 0},
    {value: 1},
    {value: 2},
    {value: 3},
    {value: 4}, 
    {value: 5},
  ];

  const handleAddNewAnime = (key: string, event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAddAnime((prev) => ({
      ...prev,
      [key]: event?.target.value
    }));
  };

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
  
  const storeNewAnime = async () => {
    const anime = collection(db, "anime");
    try {
      await addDoc(anime, addAnime);
    } catch (err) {
      console.error(err)
    }
  };

  const fetchAnimes = useCallback(async () => {
    const anime = collection(db, "anime");
    try {
      const response = query(anime);
      const docs = await getDocs(response);
      const animeData = docs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as FetchAnime[];

      setAnimeList(animeData);
    } catch (err) {
      console.error(err);
    }
  }, []); 

  useEffect(() => {
    fetchAnimes();
  }, [fetchAnimes]);

  return (
    <>
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
    <div style={{ width: "100%", height: "1px", background: "white" }} />
    <div style={{ display: "flex", flexWrap: "wrap", padding: "4px", gap: "4px" }}>
      <input placeholder="Título do anime..." value={addAnime.name} onChange={(e) => handleAddNewAnime("name", e)} style={{ width: "20%" }}/>
      <input placeholder="Ano de lançamento..." value={addAnime.release_year} onChange={(e) => handleAddNewAnime("release_year", e)} style={{ width: "20%" }}/>
      <input placeholder="Gênero..." value={addAnime.gender} onChange={(e) => handleAddNewAnime("gender", e)} style={{ width: "20%" }}/>
      <select onChange={(e) => handleAddNewAnime("avaliation", e)} style={{ width: "10%" }}>
        <option value="">Selecione uma avaliação</option>
        {avaliations.map((item) => (
          <option key={item.value} value={item.value}>
            {item.value}
          </option>
        ))}
      </select>
      <button 
        style={{ width: "20%" }} 
        onClick={storeNewAnime}>
          Cadastrar
      </button>
    </div>
    <div style={{ width: "100%", height: "1px", background: "white" }} />
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", width: "100%", padding: "12px" }}>
      {
        animeList.length > 0 && animeList.map((anime: FetchAnime) => <AnimeCard key={anime.id} {...anime} />)
      }
    </div>
    </>
  );
};

export default App;
