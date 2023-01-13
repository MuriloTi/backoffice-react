import React from "react";

export default function Header(props){
    return (
        <thead>
        <tr>
            <th colSpan="8">Total de Pessoas: {props.count}</th>
        </tr>
        <tr>
            <th className="text-center">Id</th>
            <th>Tipo</th>
            <th>Nome/Razão Social</th>
            <th>CPF/CNPJ</th>
            <th>Qualificação</th>
            <th></th>
        </tr>
    </thead>
    );
}