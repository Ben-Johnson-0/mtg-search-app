// Home Page
import MultiCardDisplay from "./MultiCardDisplay";
import SearchGUI from "./SearchGUI"
import fetchCards from "./fetch"


export default async function Home() {
  const cards = await fetchCards();

  return (
    <div>
      <SearchGUI />
      <MultiCardDisplay cards={cards} />
    </div>
  );
}
