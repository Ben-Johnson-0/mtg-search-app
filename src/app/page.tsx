// Home page
import CardSearchPage from "./card-search/CardSearchPage";

export const metadata = {
  title: "MTG Search App",
  description: "Search Magic: The Gathering cards by name, color, and more.",
  keywords: ["magic", "cards", "mtg", "search"],
  authors: [{ name: "Ben Johnson" }],
  creator: "Ben Johnson",
};

export default async function Home() {
  return (
    <main>
      <CardSearchPage />
    </main>
  );
}
