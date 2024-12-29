const booking = require('../models/bookings.model');

/*
    checkCustomer > Comprueba si el cliente existe en la BBDD
    checkBookingDate > Comprueba si la fecha de reserva esta informada y no es anterior a 2 dias
    checkRequestDate > Comprueba si la fecha de solicitud esta informada y no es anterior a la fecha actual
    checkService > Comprueba si el servicio existe en la BBDD
*/


const checkCustomer = async (customerID) => {   

    if (!customerID){
        return { error: true, message: 'ID de cliente no existe'}    
    }    

    const customer = await booking.findById(customerID);

    if (!customer) {
        return { error: true, message: 'Cliente no existe en BBDD' }
    }

    return { error: false, message: '' }

}

const checkBookingDate =  (bookingDate) => {

    const today = new Date();
    const maximumAdvanceBooking = 2 // 2 days
    
    if(!bookingDate){
        return { error: true, message: 'Fecha de reserva debe de informarse' }
    }   
    
    const maxAdvanceDate = new Date(today.setDate(today.getDate() - maximumAdvanceBooking));     

    if (bookingDate < maxAdvanceDate) {
        return { error: true, message: `Fecha de reserva no puede ser anterior a ${maximumAdvanceBooking} dias` }
    }

    return { error: false, message: '' }

}

const checkRequestDate =  (requestDate) => {

    const today = new Date();
    
    if(!requestDate){
        return { error: true, message: 'Fecha de solicitud debe de informarse' }
    }
    
    if(requestDate < today){
        return { error: true, message: 'Fecha de solicitud no puede ser anterior a la fecha actual' }
    }

    return { error: false, message: '' }

}


const checkService = async (serviceID) => {

    if(!serviceID){
        return { error: true, message: 'ID de servicio no existe' }
    }

    const service = await booking.findById(serviceID);

    if(!service){
        return { error: true, message: 'Servicio no existe en BBDD' }
    }

    return { error: false, message: '' }
}

const validateBooking = async (bookingData) => {

    const {
        bookingDate, 
        serviceID, 
        customerID, 
        requestDate} = bookingData;

// Las funciones de validacion se ejecutan y se almacenan en la propiedad 'resulta' respectivamente. 
    const validations = [
        {result: checkCustomer(customerID), field: "customerID"},
        {result: checkBookingDate(bookingDate), field: "description"},
        {result: checkRequestDate(requestDate), field: "customerType"},
        {result: checkService(serviceID), field: "service"}
    ]

    // Si alguna de las funciones de validacion devuelve un error, se devuelve el error
    for (const validation of validations) {
        if (validation.result.error) {
            return validation.result
        }
    }


}

module.exports = {validateBooking}  