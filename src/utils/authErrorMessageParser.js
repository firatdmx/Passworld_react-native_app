export default function(errorCode){
    switch (errorCode) {
        case "auth/invalid-email":
            return "The provided value for the email user property is invalid. It must be a string email address."
        case "auth/wrong-password":
            return "The provided password is wrong"
        case "auth/email-already-exists":
            return "The provided email is already in use by an existing user. Each user must have a unique email."
        case "auth/invalid-password":
            return "The provided value for the password user property is invalid. It must be a string with at least six characters."
        case "auth/too-many-requests":
            return "The number of requests exceeds the maximum allowed."
        case "auth/user-not-found":
            return "There is no existing user record corresponding to the provided identifier."
        default:
            return "Unknown error."
    }
}