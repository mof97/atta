
const rule = {
    required: true,
    message: 'Require',
    trigger: 'blur'
}

export const BookVisaRules = {
    contact: {
        email: rule,
        phone: rule,
    },
    passengers:{
        type:rule,
        title:rule,
        first_name:rule,
        last_name:rule,
        nationality:rule,
        birth_date:rule,
        document_no:rule,
        document_expiry:rule,
    }
}
