import { useEffect, useState, useRef } from "react";
import axios from 'axios'
import Card from './Card'
import './CardsWrapper.css'

const BASE_URL = 'https://deckofcardsapi.com/api/deck/'

const CardsWrapper = () => {
    const [drawnCard, setDrawnCard] = useState([]);
    const [deckId, setDeckId] = useState(null);
    const [autoDraw, setAutoDraw] = useState(false);
    const timer = useRef(null);
    useEffect(() => {
        axios.get(`${BASE_URL}new/shuffle`)
            .then(res => {
                setDeckId(res.data.deck_id)
            })
    }, [setDeckId]);


    useEffect(() => {
        const drawCard = async () => {
            let deck = deckId
            try {
                let cardRes = await axios.get(`${BASE_URL}${deck}/draw/`);

                console.log(cardRes.data.remaining)
                if (cardRes.data.remaining === 1) { 
                    setAutoDraw(false);
                    alert("No cards remaining!");
                };

                const card = cardRes.data.cards[0];

                setDrawnCard(c => [
                    ...c,
                    {
                        id: card.code,
                        image: card.image
                    }
                ]);


            } catch (e) {
                throw new Error('Error retrieving data.')
            }
        }

        if (autoDraw && !timer.current) {
            timer.current = setInterval(async () => {
                await drawCard();
            }, 1000);
        }

        return ()=>{
            clearInterval(timer.current);
            timer.current = null;
        }
    }, [setAutoDraw, autoDraw, deckId]);




    const cards = drawnCard.map(c => (
        <Card key={c.id} image={c.image} />

    ));

    const toggleDraw = () => {
        setAutoDraw(!autoDraw)
    }




    return (
        <div className='CardsWrapper'>
            <button className='CardsWrapper-button' onClick={toggleDraw}>
            {autoDraw ? "Stop" : "Start"} Drawing</button>
            <div>
                {cards}
            </div>

        </div>

    )
}

export default CardsWrapper;