import React, { useState } from "react";
import Button from "../Button";
import EditEndereco from "./EditEndereco";
import {GetEnderecoCompleto} from "../../utilities/Methods";

export default function Body(props) {

    const [showEditModal, setShowEditModal] = useState(false);
    const [endereco, setEndereco] = useState({});

    function handleShowEditModal(endereco) {
        setEndereco(endereco);
        setShowEditModal(true);
    }
    function handleCloseEditModal() {
        setShowEditModal(false);
    }

    return (
        <>
            {showEditModal ? <EditEndereco closeModal={handleCloseEditModal} updatedObject={props.updatedObject} endereco={endereco} /> : <></>}
            <tbody>
                {props.enderecos.length > 0 ?
                    props.enderecos.map((endereco) => (
                        <tr key={endereco.id}>
                            <td>{new Date(endereco.dataCriacao).toLocaleString()}</td>
                            <td>{new Date(endereco.dataUltimaAlteracao).toLocaleString()}</td>
                            <td>{endereco.id}</td>
                            <td>{GetEnderecoCompleto(endereco)}</td>
                            <td className="d-flex justify-content-between">
                                <Button.Secondary type="button" text="Edit" onClick={() => handleShowEditModal(endereco)} />
                                <Button.Danger type="button" text="Delete" onClick={() => props.onDelete(endereco.id)} />
                            </td>
                        </tr>
                    )) : <strong className="text-danger">Nenhum endereço encontrado</strong>}
            </tbody>
        </>
    );
}