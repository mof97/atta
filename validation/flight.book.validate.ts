
const rule = {
    required: true,
    message: 'Require',
    trigger: 'blur'
}

export const BookRules = {
    contact: {
        first_name: rule,
        last_name: rule,
        email: rule,
        phone: rule,
    },
    passengers:{
        title:rule,
        first:rule,
        // middle: {
        //     ...rule,
        //     required: false,
        // },
        last:rule,
        nationality:rule,
        document_no:rule,
        document_expiry:rule,
        dob:rule,
    }
}
