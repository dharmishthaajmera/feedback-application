const responseMessages = {
  VALID_STRING: (field) => `${field} must be a valid string.`,
  INVALID_PASSWORD:
    "Password must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters.",
  BOOLEAN_REQUIRED: (field) => `${field} must be a boolean value.`,
  REQUIRED_FIELD: (field) => `${field} is a required field.`,
  INVALID_EMAIL: `Email must be valid.`,
};

module.exports = {
  responseMessages,
};
