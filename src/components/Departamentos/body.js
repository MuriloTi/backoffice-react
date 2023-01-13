import React, { useState } from "react";
import Button from "../Button";
import EditDepartamento from "./EditDepartamento";

export default function Body(props) {

    const [showEditModal, setShowEditModal] = useState(false);
    const [departamento, setDepartamento] = useState({});

    function handleShowEditModal(departamento) {
        setDepartamento(departamento);
        setShowEditModal(true);
    }
    function handleCloseEditModal() {
        setShowEditModal(false);
    }

    return (
        <>
            {showEditModal ? <EditDepartamento closeModal={handleCloseEditModal} updatedObject={props.updatedObject} departamento={departamento} /> : <></>}
            <tbody>
                {props.departamentos.length > 0 ?
                    props.departamentos.sort((a, b) => a.titulo.localeCompare(b.titulo)).map((departamento) => (
                        <tr key={departamento.id}>
                            <td className="text-center">{departamento.id}</td>
                            <td>{departamento.titulo}</td>
                            <td>{departamento.nomeResponsavel}</td>
                            <td className="d-flex justify-content-between">
                                <Button.Secondary type="button" text="Edit" onClick={() => handleShowEditModal(departamento)} />
                                <Button.Danger type="button" text="Delete" onClick={() => props.onDelete(departamento.id)} />
                            </td>
                        </tr>
                    )) : <strong className="text-danger">Nenhum departamento encontrado</strong>}
            </tbody>
        </>
    );
}