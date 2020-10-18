const verify = function() {

    const error = []

    return {
        isEmpyt: (imput) =>
        {
            const outpt = imput ? imput.trim() : undefined

            if (!outpt || typeof outpt == undefined || outpt == null)
            {
                return true
            }
            else
            {
                return false
            }
        },
        minLength: (imput, min) =>
        {
            const outpt = imput ? imput.trim() : undefined

            if (outpt.length < min)
            {
                return true
            }
            else {
                return false
            }
        },
        maxLength: (imput, max) =>
        {
            const outpt = imput ? imput.trim() : undefined

            if (outpt.length > max)
            {
                return true
            }
            else {
                return false
            }
        },
        notName: (imput) =>
        {
            const name = imput ? imput.trim() : undefined
            const regex = /^([áàÁÀéèÉÈíìÍÌóÒúùÚÙa-zA-Z])([áàÁÀéèÉÈíìÍÌóÒúùÚÙ a-zA-Z]){3,}$/

            if (RegExp(regex).test(name) == false)
            {
                return true
            }
            else
            {
                return false
            }
        },
        notEmail: (imput) =>
        {
            const email = imput ? imput.trim() : undefined
            const regex = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*[@][a-zA-Z0-9_]*[.][a-zA-Z]{2,}$/

            if (RegExp(regex).test(email) == false)
            {
                return true
            }
            else
            {
                return false
            }
        },
        notSecurity: (imput) =>
        {
            const password = imput ? imput.trim() : undefined
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-+@#$%&*!?º:_])([-+@#$%&*!?º:_ a-zA-Z0-9]){3,}$/

            if (RegExp(regex).test(password) == false)
            {
                return true
            }
            else
            {
                return false
            }
        },
        isSqlInjection: (imput) =>
        {
            const output = imput ? imput.trim() : undefined
            const regex = /^[-+='"´`@#$%&*º()/.,;:_?!áàÁÀéèÉÈíìÍÌóÒúùÚÙ a-zA-Z0-9]{1,}$/

            if (RegExp(regex).test(output) == false)
            {
                return true
            }
            else
            {
                return false
            }
        },
        getMessage: (message) =>
        {
            error.push({message: message})
            return error
        }
    }
}

module.exports = new verify
