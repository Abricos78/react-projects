import React, { useState } from 'react';

const Tour = ({id, name, image, info, price, removeTour}) => {

    const [readMore, setReadMore] = useState(0)

    const btnReadMore = () => {
        setReadMore(!readMore)
    }

    return (
        <article className='single-tour'>
            <img src={image} alt={name} />
            <footer>
                <div className='tour-info'>
                    <h4>{name}</h4>
                    <h4 className='tour-price'>{`$ ${price}`}</h4>
                </div>
                <p>
                    { readMore ? info : `${info.substring(0, 200)}... ` }
                    <button onClick={btnReadMore}>{readMore ? 'Show Less' : 'Read More'}</button>
                </p>
                <button onClick={() => removeTour(id)} className='delete-btn'>not interested</button>
            </footer>
        </article>
    )
};

export default Tour;
