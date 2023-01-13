import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Loading from "../../Loading";
import Modal from 'react-bootstrap/Modal';
import {Get} from "../../../utilities/PessoasService";
import { Put } from "../../../utilities/DepartamentosService";
import Input from "../../Input";
import Button from "../../Button";
import ErrorMessage from "../../ErrorMessage";

export default function EditDepartamento(props) {

    const [departamento, setDepartamento] = useState(props.departamento);
    const [colaboradores, setColaboradores] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setLoading(true);
        function GetData() {
            Get().then(res => {
                const result = res.filter((item) => item.colaborador === true)
                setColaboradores(result.sort((a, b) => a.nome.localeCompare(b.title)));
                setErrorMessage('');
                setLoading(false);
            }).catch(error => {
                console.log(error);
                setErrorMessage(error.response.data);
                setLoading(false);
            });
        };
        GetData();
    }, []);

    function updateObject() {
        setSaving(true);
        Put(departamento.id, departamento).then(() => {
            props.updatedObject();
            props.closeModal();
        }).catch(function (error) {
            console.log(error);
            setErrorMessage(error.response.data);
            setSaving(false);
        });
    }

    function handleForm(e) {
        e.preventDefault();
        updateObject();
    }

    const handleChange = (e) => {
        setDepartamento({
            ...departamento,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <Modal show={true} onHide={props.closeModal}>
            <Form onSubmit={handleForm}>
                <Modal.Header>
                    <Modal.Title>Editar Departamento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                {loading ? <Loading text="Loading..." />
                        : colaboradores && colaboradores.length > 0 ?
                            <>
                                <Input.Text name="titulo" id="titulo" label="Titulo" defaultValue={departamento.titulo} onChange={handleChange} />
                                <div className="form-group form-floating mb-3">
                                    <select className="form-select" name="responsavelId" id="responsavelId" defaultValue={departamento.responsavelId} onChange={handleChange}>
                                        <option value="0">Select...</option>
                                        {colaboradores.map((colaborador) => (
                                            <option key={colaborador.id} value={colaborador.id}>{colaborador.nome}</option>
                                        ))}
                                    </select>
                                    <label htmlFor="responsavelId" className="form-label">Responsável</label>
                                </div>
                            </> : <>
                                <ErrorMessage msg="Nenhum colaborador cadastrado" />
                            </>}
                          
                    <div className="form-group shadow mb-3">
                        {saving ? <Loading text='Saving...' /> : <></>}
                        <span className="text-danger">{errorMessage}</span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-between w-100">
                        <Button.Success type="button" text="Cancel" onClick={props.closeModal} />
                        <Button.Primary type="submit" text="Save" disabled={saving ? 'disabled' : ''} />
                    </div>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}