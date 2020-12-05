var fields = {
    email: {
        message: "Must be a valid email address.",
        required: "Email is required.",
        isEmail: "Email is invalid."
    },
    password: {
        required: "Password is required."
    },
    verify: {
        required: "Please retype your password.",
        noMatch: ["Password do not match.", "password"]
    },
    first_name: {
        required: "First name is required"
    },
    last_name: {
        required: "Last name is required."
    },
    zip: {
        message: "Use 5 or 9 digit ZIP code.",
        required: " ZIP Code is required.",
        isZip: "ZIP Code is invalid."
    },
    card_number: {
        message: "Use 1111-2222-3333-4444 format.",
        required: " Card number is required.",
        isCC: "Card number is invalid."
    },
    exp_date: {
        message: "Use mm/YYYY format.",
        required: "Expiration date is required.",
        isDate: "Expiration date is invalid.",
        expired: "Card has expired."
    }
};