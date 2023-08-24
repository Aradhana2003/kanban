import React from "react";
import './Board.css';
import Card from "../Card/Card";
import { Plus } from "react-feather";
import { MoreHorizontal } from "react-feather";

function Board({ title, icon , tickets }) {

    return (
        <div className="board">
            <div className="board_top">
                <p className="board_top_title">{icon} {title} <span>{tickets.length}</span> </p>
                <Plus/> 
                <MoreHorizontal/>             
            </div>
            <div className="board_cards">
            {tickets.map((ticket) => (
            <Card key={ticket.id} ticket={ticket} 
/>
                ))}
            </div>
        </div>
    )
}
export default Board
