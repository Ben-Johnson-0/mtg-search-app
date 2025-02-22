import Card from "./Card"
import SearchGUI from "./SearchGUI"

export default function Home() {
  return (
    <div>
      <h1>example text</h1>
      <SearchGUI />
      <Card img="https://cards.scryfall.io/normal/front/a/3/a3da3387-454c-4c09-b78f-6fcc36c426ce.jpg" name="example" />
    </div>
  );
}
