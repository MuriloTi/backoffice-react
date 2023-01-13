import React, { useState } from "react";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import { Delete } from "../../utilities/EnderecosService";
import Body from "./body";
import Header from "./header";
import Button from "../Button";
import CreateEndereco from "./CreateEndereco";

export default function Enderecos(props) {

    const enderecos = props.pessoa.enderecos;
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);

    function handleDelete(id) {
        Delete(id).then(() => {
            setSuccessMessage("O endereço foi deletada com sucesso");
            setErrorMessage('');
            props.handleDeleted();
        }).catch(error => {
            console.log(error);
            setErrorMessage(error.response.data);
            setSuccessMessage('');
        });
    }

    function handleShowCreateModal() {
        setShowCreateModal(true);
    }
    function handleCloseCreateModal() {
        setShowCreateModal(false);
    }
    function handleCreated() {
        setErrorMessage('');
        setSuccessMessage('Endereço criado com sucesso!');
        props.handleCreated();
    }
    function handleUpdated() {
        setErrorMessage('');
        setSuccessMessage('Endereço atualizado  com sucesso!');
        props.handleUpdated();
    }

    return (

        <main className="container">
            {showCreateModal ? <CreateEndereco closeModal={handleCloseCreateModal} pessoaId={props.pessoa.id} createdNewEndereco={handleCreated} /> : <></>}
            {errorMessage ? <ErrorMessage msg={errorMessage} /> : <></>}
            {successMessage ? <SuccessMessage msg={successMessage} /> : <></>}
            <div className="row mt-4">
                <div className="col-md-4 mb-3">
                    <Button.Primary type="button" text="Novo Endereço" disabled={false} onClick={handleShowCreateModal} />
                </div>
            </div>
            <table className="table">
                <Header count={enderecos.length} />
                <Body enderecos={enderecos} onDelete={handleDelete} updatedObject={handleUpdated} />
            </table>
        </main>

    );

}