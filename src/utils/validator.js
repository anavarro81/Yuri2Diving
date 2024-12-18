const Cliente = require('../models/clientes.model');

const validateFullName = (fullName) => {
    
    if (!fullName) {
        return {
            error: true,
            message: 'El nombre y apellidos son obligatorios'}
    }

    if (fullName.length < 10) {
        return {
            error: true,
            message: 'El nombre y apellidos deben tener al menos 10 caracteres'}
    }

    return {error: false, message: 'nombre y apellidos validados'}

}

const validatePhone = async (phone) => {
    
    if (!phone) {
        return {
            error: true,
            message: 'El telefono es obligatorio'}
    }

    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    
    // Valida que el telefono sea un numero valido. Incluye el signo + y hasta 14 digitos
    if (!phoneRegex.test(phone)) {
        return {
            error: true,
            message: 'Telefono no valido'}
    }

    const usedPhone = await Cliente.find({telefono: phone});

    

    if (usedPhone.length > 0) {
        return {
            error: true,
            message: 'Telefono ya registrado'}
    }

    return {error: false, message: 'Telefono validado'}
}

const validateEmail = (email) => {
    
    if (!email) {
        return {
            error: true,
            message: 'El correo es obligatorio'}
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    // Valida que el correo sea un correo valido
    if (!emailRegex.test(email)) {
        return {
            error: true,
            message: 'Correo no valido'}
    }

    const usedEmail = Cliente.find({correo: email});

    if (usedEmail.length > 0) {
        return {
            error: true,
            message: 'Correo ya registrado'}
    }

    return {error: false, message: 'Correo validado'}
}

const validatePrivateDoc = (document) => {

    // Se comprueba que el DNI este subido
    const dni = document.find( doc => doc.tipo === 'DNI' );
    if (!dni) {
        return {
            error: true,
            message: 'El DNI es obligatorio'}
    } else {
        if (!dni.url_documento) {
            return {
                error: true,
                message: 'No se subido documento para DNI'}
        }
    }

    // Se comprueba que el Titulo de buceo este subido
    const tituloBuceo = document.find( doc => doc.tipo === 'TituloBuceo' );
    if (!tituloBuceo) {
        return {
            error: true,
            message: 'El Titulo de buceo es obligatorio'}
    } else {    
        if (!tituloBuceo.url_documento) {
            return {
                error: true,
                message: 'No se subido documento para Titulo de buceo'}
    }

    // Se comprueba que el Seguro de buceo este subido
    const seguroBuceo = document.find( doc => doc.tipo === 'SeguroBuceo' );
    if (!seguroBuceo) {
        return {
            error: true,
            message: 'El Seguro de buceo es obligatorio'}
    } else {
        if (!seguroBuceo.url_documento) {
            return {
                error: true,
                message: 'No se subido documento para Seguro de buceo'}
        }
    }
    }


}

const validateCompanyDoc = (document) => {
    console.log('Validando documentacion de empresa');
}

const validateClubDoc = (document) => { 
    console.log('Validando documentacion de club');
}



const validateDocument = (document, tipoCliente) => {
    
    if (document.length == 0) {
        return {
            error: true,
            message: 'La documentacion es obligatoria'}
    }

    switch (tipoCliente) {
        case 'Particular':
            validatePrivateDoc(document);
        case 'Empresa':
            validateCompanyDoc(document);
            break;
        case 'Club':
            validateClubDoc(document);
            break;
        default:
            return {
                error: true,
                message: 'Tipo de cliente no valido'}   
    }
    

    


    

    return {error: false, message: 'Documento validado'}
}

const validateClient = async (client) => {
    
    const {nombreApellidos, telefono, correo, documentacion, tipoCliente} = client;

    const fullName = validateFullName(nombreApellidos);
    if (fullName.error) {
        return false
    }

    const phone = validatePhone(telefono);
    if (phone.error) {
        return phone;
    }

    const email = validateEmail(correo);
    if (email.error) {
        return email;
    }

    const document = validateDocument(documentacion, tipoCliente);
    if (document.error) {
        return document;
    }

    return {error: false, message: 'Cliente validado'}
}

module.exports = {validateClient}; 