import { useState } from "react";
import { trains } from "../data/trains";
import TrainList from "../components/TrainList";
import styles from "./Home.module.css";

function Home() {
  const [query, setQuery] = useState("");

  const filtered = trains.filter((t) => {
    const q = query.toLowerCase();
    return (
      t.from.toLowerCase().includes(q) ||
      t.to.toLowerCase().includes(q) ||
      t.number.toLowerCase().includes(q)
    );
  });

  return (
    <div className={styles.page}>
      <h1 className={styles.title}> Залізничні квитки</h1>
      <p className={styles.subtitle}>Знайди свій рейс і забронюй місце</p>
      <input
        className={styles.search}
        type="text"
        placeholder="Пошук за містом або номером поїзда..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <TrainList trains={filtered} />
    </div>
  );
}

export default Home;