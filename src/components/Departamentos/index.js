import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import { Get, Delete } from "../../utilities/DepartamentosService";
import Body from "./body";
import Header from "./header";
import Button from "../Button";
import CreateDepartamento from "./CreateDepartamento";

export default function Departamentos() {

    const [departamentos, setDepartamentos] = useState({});
    const [filteredDepartamentos, setFilteredDepartamentos] = useState({});
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [updates, setUpdates] = useState(0);


    useEffect(() => {
        setLoading(true);
        function getData() {
            Get().then(res => {
                setDepartamentos(res);
                setFilteredDepartamentos(res);
                setErrorMessage('');
                setLoading(false);
            }).catch(error => {
                console.log(error);
                setErrorMessage('Occoreu um erro ao listar os departamentos da API');
                setLoading(false);
            })
        };
        getData();
    }, [updates]);

    function handleDelete(id) {
        Delete(id).then(() => {
            setSuccessMessage("O Departamento foi deletado com sucesso");
            setErrorMessage('');
            setUpdates(updates + 1);
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
        setSuccessMessage('Departamento criado com sucesso!');
        setUpdates(updates + 1);
    }
    function handleUpdated() {
        setErrorMessage('');
        setSuccessMessage('Departamento atualizado com sucesso!');
        setUpdates(updates + 1);
    }
    function handleSearch(e) {
        if (e.target.value === null || e.target.value === "") {
            setFilteredDepartamentos(departamentos);
        } else {
            setFilteredDepartamentos(
                departamentos.filter((item) => item.titulo.toUpperCase().includes(e.target.value.toUpperCase()))
            );
        }
    }

    return (
        loading ? <Loading text="Loading..." />
            : <main className="container">
                {showCreateModal ? <CreateDepartamento closeModal={handleCloseCreateModal} createdNewDepartamento={handleCreated} /> : <></>}
                {errorMessage ? <ErrorMessage msg={errorMessage} /> : <></>}
                {successMessage ? <SuccessMessage msg={successMessage} /> : <></>}
                <div className="row mt-4">
                    <div className="col-md-4 mb-3">
                        <Button.Primary type="button" text="Novo Departamento" disabled={false} onClick={() => handleShowCreateModal()} />
                    </div>
                </div>
                <div className="mt-3 col-md-6">
                    <div className="form-group mb-3">
                        <input type="text" name="search" id="search" className="form-control form-control-sm" placeholder="Pesquisar" onChange={handleSearch} />
                    </div>
                </div>
                <table className="table">
                    <Header count={departamentos.length} />
                    <Body departamentos={filteredDepartamentos} onDelete={handleDelete} updatedObject={handleUpdated} />
                </table>
            </main>

    );

}