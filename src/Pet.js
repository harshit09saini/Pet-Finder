import React from "react";
import { Link } from "@reach/router";

export default function Pet({
  name,
  animal,
  breed,
  media,
  location,
  id,
  age,
  gender,
}) {
  let image = "http://placecorgi.com/300/300";
  if (media.length) {
    image = media[0].full;
  }
  return (
    <Link to={`/details/${id}`} className="pet">
      <div
        className="image-container"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* <img src={image} alt={`Animal:${animal}, Breed:${breed}`} /> */}
      </div>
      <div className="info">
        <h4 className="pet_category">{location}</h4>
        <h1>{name}</h1>
        <h2>{`${breed} • ${age} • ${gender}`}</h2>
      </div>
    </Link>
  );
}
