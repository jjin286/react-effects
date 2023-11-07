import { useEffect, useState } from "react";

const DECK_OF_CARDS_API = "https://deckofcardsapi.com/api/deck";

/**Get deck and draw cards
 *
 * State
 * - deck
 * - deckId
 *
 * Event
 * drawCard: calls DeckOfCards API and draw card from deck
*/
function DeckOfCards(){
  const [deck, setDeck] = useState([]);
  const [deckId, setDeckId] = useState("");

  useEffect(function callGetDeck(){
    /**Get a deck ID from DeckOfCards API */
    async function getDeck(){
      const response = await fetch(`${DECK_OF_CARDS_API}/new/shuffle/?deck_count=1`);
      const data = await response.json();

      setDeckId(data.deck_id);
    }
    getDeck();
  }, [])

  /**Draw a card from DeckOfCards API */
  async function drawCard(){
    const response = await fetch(`${DECK_OF_CARDS_API}/${deckId}/draw/?count=1`);
    const data = await response.json();
    setDeck(deck => [...deck, data.cards[0]]);
  }

  return(
    <div className="DeckOfCards">
      <button onClick={drawCard}>Gimme a card</button>
      <div>
        {deck.map(c => <img key={c.code} src={c.image} alt={c.code}/>)}
      </div>
    </div>
  )
}

export default DeckOfCards;