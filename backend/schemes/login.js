import zod from 'zod'

const loginScheme = zod.object({
    userName: zod.string(
        {
            invalid_type_error: 'Username must contain at least one letter',
            required_error: 'Username is required'
        }
    ).min(3).max(20).regex(/[A-Za-z]/, 'Username must contain at least one letter'),
    password: zod.string(
        {
            invalid_type_error: 'Password must be a string',
            required_error: 'Password is required'
        }
    ).min(8).max(255).regex(/^(?=.*[a-zA-Z])(?=.*\d)/, 'Password must contain at least one letter and one digit'),
})

export function validateLogin(user){
    return loginScheme.safeParse(user)
}