import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import { Get, Delete } from "../../utilities/PessoasService";
import Body from "./body";
import Header from "./header";
import Button from "../Button";
import CreatePessoa from "./CreatePessoa";

export default function Pessoas() {

    const [pessoas, setPessoas] = useState({});
    const [filteredPessoas, setFilteredPessoas] = useState({});
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [updates, setUpdates] = useState(0);
    const [tipoPessoa, setTipoPessoa] = useState(1);


    useEffect(() => {
        setLoading(true);
        function getData() {
            Get().then(res => {
                setPessoas(res);
                setFilteredPessoas(res);
                setErrorMessage('');
                setLoading(false);
            }).catch(error => {
                console.log(error);
                setErrorMessage('Occoreu um erro ao listar as pessoas da API');
                setLoading(false);
            })
        };
        getData();
    }, [updates]);

    function handleDelete(id) {
        Delete(id).then(() => {
            setSuccessMessage("A Pessoa foi deletada com sucesso");
            setErrorMessage('');
            setUpdates(updates + 1);
        }).catch(error => {
            console.log(error);
            setErrorMessage(error.response.data);
            setSuccessMessage('');
        });
    }

    function handleShowCreateModal(tipo) {
        setTipoPessoa(tipo);
        setShowCreateModal(true);
    }
    function handleCloseCreateModal() {
        setShowCreateModal(false);
    }
    function handleCreated() {
        setErrorMessage('');
        setSuccessMessage('Pessoa criada com sucesso!');
        setUpdates(updates + 1);
    }
    function handleUpdated() {
        setErrorMessage('');
        setSuccessMessage('Pessoa atualizada com sucesso!');
        setUpdates(updates + 1);
    }
    function handleSearch(e) {
        if (e.target.value === null || e.target.value === "") {
            setFilteredPessoas(pessoas);
        } else {
            setFilteredPessoas(
                pessoas.filter((item) => item.nome.toUpperCase().includes(e.target.value.toUpperCase()))
            );
        }
    }

    return (
        loading ? <Loading text="Loading..." />
            : <main className="container">
                {showCreateModal ? <CreatePessoa closeModal={handleCloseCreateModal} tipoPessoa={tipoPessoa} createdNewPessoa={handleCreated} /> : <></>}
                {errorMessage ? <ErrorMessage msg={errorMessage} /> : <></>}
                {successMessage ? <SuccessMessage msg={successMessage} /> : <></>}
                <div className="row mt-4">
                <div className="col-md-4 mb-3">
                    <Button.Primary type="button" text="Nova Pessoa Física" disabled={false} onClick={() => handleShowCreateModal(1)} />
                </div>
                <div className="col-md-4 mb-3">
                    <Button.Primary type="button" text="Nova Pessoa Jurídica" disabled={false} onClick={() => handleShowCreateModal(2)} />
                </div>
                </div>
                <div className="mt-3 col-md-6">
                    <div className="form-group mb-3">
                        <input type="text" name="search" id="search" className="form-control form-control-sm" placeholder="Pesquisar" onChange={handleSearch} />
                    </div>
                </div>
                <table className="table">
                    <Header count={pessoas.length} />
                    <Body pessoas={filteredPessoas} onDelete={handleDelete} updatedObject={handleUpdated} />
                </table>
            </main>

    );

}