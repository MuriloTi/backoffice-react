export const TipoPessoa = {
    Fisica: 1,
    Juridica: 2
}

export const GetType = (type) => {
    let text = '';
    switch (type) {
        case TipoPessoa.Fisica:
            text = "Física";
            break;
        case TipoPessoa.Juridica:
            text = "Jurídica";
            break;
        default:
            text = "";
            break;
    }
    return text;
}