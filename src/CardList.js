import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const CardList = () => {
    const [deckId, setDeckId] = useState({ deck: null });
    const [cards, setCards] = useState([]);
    const [count, setCount] = useState(52);

    useEffect(() => {
        const getDeckId = async () => {
            const res = await axios.get(
                "https://deckofcardsapi.com/api/deck/new/shuffle/"
            );
            setDeckId(res.data.deck_id);
            console.log(deckId);
        };
        getDeckId();
    }, []);

    const drawACard = async () => {
        const card = await axios.get(
            `http://deckofcardsapi.com/api/deck/${deckId}/draw/`
        );
        const newCard = card.data;
        console.log(newCard.cards);
        const remaining = card.data.remaining;
        console.log(remaining);
        if (!remaining) {
            alert("Out of cards. Click OK to reset and draw again!");
            setCards([]);
        } else {
            setCards((cards) => [...cards, newCard.cards[0]]);
            setCount((count) => count - 1);
            console.log(cards);
        }
    };

    return (
        <div>
            <div>
                <button onClick={drawACard}>Draw a Card</button>
                {/* <button onClick={reset}>Reset</button> */}
                <h3>
                    You have drawn {cards.length} cards. You have {count}{" "}
                    remaining in this deck!
                </h3>
            </div>
            {cards.map((card) => (
                <Card
                    key={card.code}
                    suit={card.suit}
                    value={card.value}
                    image={card.image}
                />
            ))}
        </div>
    );
};

export default CardList;
