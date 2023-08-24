import React from "react";
import './Card.css'
import { User } from "react-feather";
import { MoreHorizontal } from "react-feather"; 


function Card({ ticket }) {
    return (
        <div className="card">
            <div className="card_top">
                <p className="card_id">{ticket.id}</p>
                <User/>
            </div>
            <div className="card_content">
                <h4 className="card_title">{ticket.title}</h4>
            <div className="card_bottom">
                <MoreHorizontal/> 
                <p className="card_tag">{ticket.tag}</p>
            </div>
                
            </div>
        </div>
    )
}
export default Card