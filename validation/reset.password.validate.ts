
const rule = {
    required: true,
    message: 'Require',
    trigger: 'blur'
}

export const RestPasswordRules = (payload) => {
    return {
        old_password:rule,
        new_password:rule,
        confirm_password:{
            validator(rule, value) {
                if (!value) {
                    return new Error(
                        'Required'
                    )
                } else if (
                    payload.new_password !== payload.confirm_password
                ) {
                    return new Error(
                        'Password Not Match'
                    )
                }
                return true
            }
        },
    }

}
