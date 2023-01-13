import React from "react";

export default function Header(props){
    return (
        <thead>
        <tr>
            <th colSpan="5">Total de Endereços: {props.count}</th>
        </tr>
        <tr>
            <th>Data de Criação</th>
            <th>Última Alteração</th>
            <th className="text-center">Id</th>
            <th>Endereço Completo</th>
            <th></th>
        </tr>
    </thead>
    );
}