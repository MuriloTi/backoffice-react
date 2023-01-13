export const FormatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export const GetEnderecoCompleto = (endereco) => {
    var result = endereco.cep + ", "  + endereco.logradouro + ", " + endereco.numero + ", " + endereco.complemento + ", " + endereco.bairro + ", " + endereco.cidade + ", " + endereco.estado;
    return result;
}