// Define a map of error codes to error messages
const errorMessages = new Map([
    [400, "Bad request. Please check your input."],
    [401, "Unauthorized. Please log in to access this resource."],
    [403, "Forbidden. You don't have permission to access this resource."],
    [404, "Not found. The requested resource could not be found."],
    [500, "Internal server error. Please try again later."],
    // Add more error codes and messages as needed
]);

// Define a utility function to generate common HTTP error messages for responses
export function getHttpErrorMessage(statusCode) {
    const Errormessage = errorMessages.get(statusCode) || "An error occurred. Please try again.";
    return Errormessage;
}