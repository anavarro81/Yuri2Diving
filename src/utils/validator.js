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

    return {error: false, message: 'nombre y apellidos validateds'}

}

const validateManager = (manager) => {

}

const validatePhone = async (phone) => {
    
    if (!phone) {
        return {
            error: true,
            message: 'El phone es obligatorio'}
    }

    
    const euPhoneRegex = /^\+\d{2}\d{9,11}$/;
    
    // Valida que el telefono sea un numero valido de la UE. 
    // Ejemplo: +34666777888
    if (!euPhoneRegex.test(phone)) {
        return {
            error: true,
            message: 'phone no valido'}
    }

    const usedPhone = await Cliente.find({phone: phone});

    

    if (usedPhone.length > 0) {
        return {
            error: true,
            message: 'phone ya registrado'}
    }

    return {error: false, message: 'phone validated'}
}

const validateEmail = (email) => {
    
    if (!email) {
        return {
            error: true,
            message: 'El email es obligatorio'}
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    // Valida que el correo sea un email valido
    if (!emailRegex.test(email)) {
        return {
            error: true,
            message: 'email no valido'}
    }

    const usedEmail = Cliente.find({email: email});

    if (usedEmail.length > 0) {
        return {
            error: true,
            message: 'email ya registrado'}
    }

    return {error: false, message: 'email validated'}
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
    console.log('Validando documentation de empresa');
}

const validateClubDoc = (document) => { 
    console.log('Validando documentation de club');
}



const validateDocument =  (document, ClientType) => {
    
    if (document.length == 0) {
        return {
            error: true,
            message: 'La documentation es obligatoria'}
    }

    switch (ClientType) {
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
    

    


    

    return {error: false, message: 'Documento validated'}
}

const validatePrivateCustomer = async (customer) => {
    
    const {fullName, phone, email, documentation, ClientType} = customer;

    const ValidfullName = validateFullName(fullName);
    if (ValidfullName.error) {
        return ValidfullName
    }

    const Validphone =  await validatePhone(phone);
    if (Validphone.error) {
        return Validphone;
    }

    const Validemail = validateEmail(email);
    if (Validemail.error) {
        return Validemail;
    }

    const document = validateDocument(documentation, ClientType);
    if (document.error) {
        return document;
    }

    return {error: false, message: 'Cliente validated'}
}

const validateCompany = (company) => {

    const {responsable, nombreComercial, phone, email, documentation} = company;

    const manager = validateManager(fullName);
    if (fullName.error) {
        return false
    }


}

const validateClub = (club) => {
}

const validateClient = async (client) => {   
    
    
    const {ClientType} = client;

    let validClient;     

    switch (ClientType) {  
        case 'Particular':
            validClient = validatePrivateCustomer(client);            
            break;
        case 'Empresa':
            validClient = validateCompany(client);
            break;
        case 'Club':
            validClient = validateClub(client);
            break;
        default:
            return {
                error: true,
                message: 'Tipo de cliente no valido'}   
    }

    return validClient;


}

module.exports = {validateClient}; 