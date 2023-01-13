import React from "react";

export default function Header(props){
    return (
        <thead>
        <tr>
            <th colSpan="4">Total de Departamentos: {props.count}</th>
        </tr>
        <tr>
            <th className="text-center">Id</th>
            <th>Titulo</th>
            <th>Responsável</th>
            <th></th>
        </tr>
    </thead>
    );
}