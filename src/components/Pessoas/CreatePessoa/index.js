import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Loading from "../../Loading";
import Modal from 'react-bootstrap/Modal';
import { Post } from "../../../utilities/PessoasService";
import Input from "../../Input";
import Button from '../../Button';
import { GetType, TipoPessoa} from '../../../utilities/enums/TipoPessoaEnum';

export default function CreatePessoa(props) {

    const emptyObject = Object.freeze({
        tipo: props.tipoPessoa,
        nome: '',
        apelido: '',
        cpf: '',
        cnpj: '',
        cliente: false,
        fornecedor: false,
        colaborador: false
    });

    const [pessoa, setPessoa] = useState(emptyObject);
    const [saving, setSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    function postNewObject() {
        setSaving(true);
        Post(pessoa).then(() => {
            props.createdNewPessoa(true);
            props.closeModal();
        }).catch(error => {
            if (error.response.status === 400) {
                setErrorMessage(JSON.stringify(error.response.data));
            }
            setSaving(false);
        });
    }

    function handleCreateForm(e) {
        e.preventDefault();
        postNewObject();
    }

    const handleChange = (e) => {
        setPessoa({
            ...pessoa,
            [e.target.name]: e.target.value,
        });
    }
    const handleChangeCliente = () => {
        setPessoa({
            ...pessoa,
            cliente: !pessoa.cliente,
        });
    }
    const handleChangeFornecedor = () => {
        setPessoa({
            ...pessoa,
            fornecedor: !pessoa.fornecedor,
        });
    }
    const handleChangeColaborador = () => {
        setPessoa({
            ...pessoa,
            colaborador: !pessoa.colaborador,
        });
    }

    return (
        <Modal show={true} onHide={props.closeModal}>
            <Form onSubmit={handleCreateForm}>
                <Modal.Header>
                    <Modal.Title>Nova Pessoa {GetType(pessoa.tipo)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {pessoa.tipo === TipoPessoa.Fisica ? <>
                        <Input.Text name="nome" id="nome" label="Nome" onChange={handleChange} />
                        <Input.Text name="apelido" id="apelido" label="Apelido" onChange={handleChange} />
                        <Input.Text name="cpf" id="cpf" label="CPF" onChange={handleChange} />
                    </> : <>
                        <Input.Text name="nome" id="nome" label="Razão Social" onChange={handleChange} />
                        <Input.Text name="apelido" id="apelido" label="Nome Fantasia" onChange={handleChange} />
                        <Input.Text name="cnpj" id="cnpj" label="CNPJ" onChange={handleChange} />
                    </>}

                    <div className="form-group">
                        <input type="checkbox" className="form-check-input m-1"
                            id="cliente" name="cliente" value="cliente"
                            checked={pessoa.cliente}
                            onChange={handleChangeCliente} />
                        <label htmlFor="cliente" className="form-label m-1">Cliente</label>
                    </div>
                    <div className="form-group">
                        <input type="checkbox" className="form-check-input m-1"
                            id="fornecedor" name="fornecedor" value="fornecedor"
                            checked={pessoa.fornecedor}
                            onChange={handleChangeFornecedor} />
                        <label htmlFor="fornecedor" className="form-label m-1">Fornecedor</label>
                    </div>
                    <div className="form-group">
                        <input type="checkbox" className="form-check-input m-1"
                            id="colaborador" name="colaborador" value="colaborador"
                            checked={pessoa.colaborador}
                            onChange={handleChangeColaborador} />
                        <label htmlFor="colaborador" className="form-label m-1">Colaborador</label>
                    </div>


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