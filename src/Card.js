import './Card.css'
import {useState} from 'react';

const Card = ({ image }) => {

    const [{angle}] = useState({
        angle: Math.random() * 40 - 20
      });

  const transform = `rotate(${angle}deg)`;
    

    return (<div className='Card'><img
        style={{transform}}
        src={image}
        alt='' />
    </div>
    )
}



export default Card;