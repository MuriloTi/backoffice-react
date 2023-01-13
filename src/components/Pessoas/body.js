import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import EditPessoa from "./EditPessoa";
import { GetType, TipoPessoa } from "../../utilities/enums/TipoPessoaEnum";

export default function Body(props) {

    const [showEditModal, setShowEditModal] = useState(false);
    const [pessoa, setPessoa] = useState({});

    function handleShowEditModal(product) {
        setPessoa(product);
        setShowEditModal(true);
    }
    function handleCloseEditModal() {
        setShowEditModal(false);
    }

    return (
        <>
            {showEditModal ? <EditPessoa closeModal={handleCloseEditModal} updatedObject={props.updatedObject} pessoa={pessoa} /> : <></>}
            <tbody>
                {props.pessoas.length > 0 ?
                    props.pessoas.sort((a, b) => a.nome.localeCompare(b.nome)).map((pessoa) => (
                        <tr key={pessoa.id}>
                            <td>{pessoa.id}</td>
                            <td>{GetType(pessoa.tipo)}</td>
                            <td>{pessoa.nome}</td>
                            <td>{pessoa.tipo === TipoPessoa.Fisica ? pessoa.cpf : pessoa.cnpj}</td>
                            <td>
                                {pessoa.cliente === true ? <><span className="w-100 mt-1">Cliente</span><br/></> : ""}
                                {pessoa.fornecedor === true ? <><span className="w-100 mt-1">Fornecedor</span><br/></> : ""}
                                {pessoa.colaborador === true ? <span className="w-100 mt-1">Colaborador</span> : ""}
                            </td>
                            <td className="d-flex justify-content-between">
                            <Link className='btn btn-primary btn-sm w-100' to={`/pessoa-details/${pessoa.id}`}>
                                Detalhes
                            </Link>
                                <Button.Secondary type="button" text="Editar" onClick={() => handleShowEditModal(pessoa)} />
                                <Button.Danger type="button" text="Delete" onClick={() => props.onDelete(pessoa.id)} />
                            </td>
                        </tr>
                    )) : <strong className="text-danger">Nenhuma pessoa encontrada</strong>}
            </tbody>
        </>
    );
}