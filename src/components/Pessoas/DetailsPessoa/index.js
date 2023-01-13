import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetById } from "../../../utilities/PessoasService";
import Loading from "../../Loading";
import ErrorMessage from "../../ErrorMessage";
import SuccessMessage from "../../SuccessMessage";
import Enderecos from "../../Enderecos";
import EditPessoa from "../EditPessoa";
import { GetType, TipoPessoa } from "../../../utilities/enums/TipoPessoaEnum";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export default function DetailsPessoa() {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [pessoa, setPessoa] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [updates, setUpdates] = useState(0);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        setLoading(true);
        function getData() {
            GetById(id).then(res => {
                setPessoa(res);
                setErrorMessage('');
                setLoading(false);
            }).catch(error => {
                setPessoa(undefined);
                console.log(error);
                setErrorMessage('Error at fetching data from API');
                setLoading(false);
            });
        };
        getData();
    }, [id, updates]);

    function handleDeletedEndereco() {
        setErrorMessage('');
        setSuccessMessage('Endereço deletado com sucesso');
        setUpdates(updates + 1);
    }

    function handleShowEditModal() {
        setShowEditModal(true);
    }
    function handleCloseEditModal() {
        setShowEditModal(false);
    }
    function handleUpdated() {
        setSuccessMessage('Pessoa alterada com sucesso');
        setErrorMessage('');
        setUpdates(updates + 1);
    }

    function handleCreatedEndereco() {
        setSuccessMessage('Endereço criado com sucesso');
        setErrorMessage('');
        setUpdates(updates + 1);
    }
    function handleUpdatedEndereco() {
        setSuccessMessage('Endereço alterado com sucesso');
        setErrorMessage('');
        setUpdates(updates + 1);
    }

    return (
        loading ? <Loading text="Loading..." /> :
            <main className="container">
                {errorMessage ? <ErrorMessage msg={errorMessage} /> : <></>}
                {successMessage ? <SuccessMessage msg={successMessage} /> : <></>}

                {pessoa ?
                    <>
                        {showEditModal ? <EditPessoa closeModal={handleCloseEditModal} updatedObject={handleUpdated} pessoa={pessoa} /> : <></>}
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <h5 className="text-center mt-1 mb-3">Detalhes da Pessoa</h5>
                                <div className="row justify-content-between">
                                    <div className="col-md-4">
                                        {pessoa.tipo === TipoPessoa.Fisica ? <>
                                            <strong>Nome: </strong><span>{pessoa.nome}</span>
                                            <br />
                                            <strong>Apelido: </strong><span>{pessoa.apelido}</span>
                                        </> : <>
                                            <strong>Razão Social: </strong><span>{pessoa.nome}</span>
                                            <br />
                                            <strong>Nome Fantasia: </strong><span>{pessoa.apelido}</span>
                                        </>}
                                        <br/>
                                        <strong>Modalidades: </strong><span>{pessoa.cliente ? "Cliente " : ""}{pessoa.fornecedor ? "Fornecedor " : ""}{pessoa.colaborador ? "Colaborador" : ""}</span>
                                        <br />
                                        <button type="button" className="btn btn-secondary btn-sm col-md-6 mt-2" onClick={handleShowEditModal}>Editar</button>
                                    </div>
                                    <div className="col-md-4">
                                        <strong>Id: </strong><span>{pessoa.id}</span>
                                        <br />
                                        <strong>Tipo: </strong><span>Pessoa {GetType(pessoa.tipo)}</span>
                                        <br />
                                        <strong>CPF/CNPJ: </strong><span>{pessoa.tipo === TipoPessoa.Fisica ? pessoa.cpf : pessoa.cnpj}</span>
                                    </div>
                                    <div className="col-md-4 text-end">
                                        <strong>Data de Criação: </strong><span>{new Date(pessoa.dataCriacao).toLocaleString()}</span>
                                        <br />
                                        <strong>Última Alteração: </strong><span>{new Date(pessoa.dataUltimaAlteracao).toLocaleString()}</span>
                                        <br />
                                    </div>
                                </div>

                                <Tabs defaultActiveKey="enderecos" className="mt-4">
                                    <Tab eventKey="enderecos" title="Endereços">
                                        <Enderecos pessoa={pessoa} handleDeleted={handleDeletedEndereco} handleUpdated={handleUpdatedEndereco} handleCreated={handleCreatedEndereco} setErrorMessage={setErrorMessage} />
                                    </Tab>
                                    <Tab eventKey="departamentos" title="Departamentos">
                                        
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>

                    </> : <></>}
            </main>
    );
}