import React from 'react'

import {download} from '../assets'
import {downloadImage} from '../utils'

const Card = ({_id, name, prompt, photo}) => {
  return (
      <div className="card">
        <div className="card-image">
          <img src={photo} alt={name} />
        </div>
        <div className="card-content">
          <span className="card-title">{name}</span>
          <p>{prompt}</p>
        </div>
        <div className="card-action">
          <button className="button is-primary" onClick={() => download(photo)}>
            Download
          </button>
          <button className="button is-danger" onClick={() => downloadImage(photo)}>
            Delete
          </button>
        </div>
      </div>
  )
}

export default Card