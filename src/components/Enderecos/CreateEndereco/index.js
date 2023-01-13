import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Loading from "../../Loading";
import Modal from 'react-bootstrap/Modal';
import { Get } from "../../../utilities/ViaCepServices";
import { Post } from "../../../utilities/EnderecosService";
import Input from "../../Input";
import Button from '../../Button';

export default function CreatePessoa(props) {

    const emptyObject = Object.freeze({
        pessoaId: props.pessoaId,
        cep: '',
        estado: '',
        cidade: '',
        bairro: '',
        logradouro: '',
        numero: '',
        complemento: ''
    });

    const [endereco, setEndereco] = useState(emptyObject);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [cepErrorMessage, setCepErrorMessage] = useState('');

    function postNewObject() {
        setSaving(true);
        Post(endereco).then(() => {
            props.createdNewEndereco(true);
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
        setEndereco({
            ...endereco,
            [e.target.name]: e.target.value,
        });
    }

    function handlePesquisarCEP() {
        setLoading(true);
        Get(endereco.cep).then(res => {
            if (res.erro === true) {
                setCepErrorMessage("CEP não encontrado");
            } else {
                setEndereco({
                    ...endereco,
                    estado: res.uf,
                    cidade: res.localidade,
                    bairro: res.bairro,
                    logradouro: res.logradouro,
                });
                setCepErrorMessage('');
            }
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setLoading(false);
        });
    }

    return (
        <Modal show={true} onHide={props.closeModal}>
            <Form onSubmit={handleCreateForm}>
                <Modal.Header>
                    <Modal.Title>Novo Endereço</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <div className="form-group form-floating mb-3">
                                <input type="text" name="cep" id="cep" className="form-control" placeholder={"CEP"} onChange={handleChange} />
                                <label htmlFor={props.id} className="form-label">CEP</label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <Button.Secondary type="button" text="Pesquisar CEP" onClick={handlePesquisarCEP} disabled={loading ? 'disabled' : ''} />
                            </div>
                        </div>
                    </div>
                    <span className="text-danger mb-3">{cepErrorMessage}</span>

                    <Input.Text name="estado" id="estado" label="Estado" defaultValue={endereco.estado} onChange={handleChange} />
                    <Input.Text name="cidade" id="cidade" label="Cidade" defaultValue={endereco.cidade} onChange={handleChange} />
                    <Input.Text name="bairro" id="bairro" label="Bairro" defaultValue={endereco.bairro} onChange={handleChange} />
                    <Input.Text name="logradouro" id="logradouro" label="Logradouro" defaultValue={endereco.logradouro} onChange={handleChange} />
                    <Input.Number name="numero" id="numero" label="Número" onChange={handleChange} />
                    <Input.Text name="complemento" id="complemento" label="Complemento" onChange={handleChange} />

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