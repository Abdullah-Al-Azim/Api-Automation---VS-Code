# API Automation Testing

A comprehensive API automation testing suite built with **Jest** and **Axios** for testing RESTful APIs. This project includes 10 test suites covering various HTTP methods, authentication, headers, parameters, schema validation, and negative test cases.

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Test Files Description](#test-files-description)
- [Reports](#reports)

---

## Project Structure

```
api-automation-testing/
├── config/
│   └── config.js                 # Configuration file with base URL and headers
├── data/
│   └── testData.json             # Test data for creating/updating resources
├── test/
│   ├── api/
│   │   ├── 01_get.test.js        # GET request tests
│   │   ├── 02_post.test.js       # POST request tests
│   │   ├── 03_put.test.js        # PUT request tests (full update)
│   │   ├── 04_patch.test.js      # PATCH request tests (partial update)
│   │   ├── 05_delete.test.js     # DELETE request tests
│   │   ├── 06_headers.test.js    # HTTP headers testing
│   │   ├── 07_params.test.js     # Query and path parameters testing
│   │   ├── 08_auth.test.js       # Authentication methods testing
│   │   ├── 09_schema.test.js     # Response schema validation
│   │   └── 10_negative.test.js   # Negative test cases
│   └── schemas/                  # JSON schema definitions
├── reports/
│   ├── API_Test_Report.html      # HTML test report
│   ├── API_Test_Report.json      # JSON test report
│   └── assets/                   # Report styling (CSS, JS)
├── package.json                  # Project dependencies
└── README.md                     # This file
```

---

## Prerequisites

- **Node.js** (v12 or higher)
- **npm** (v6 or higher)

---

## Installation

1. **Clone the repository or extract the project:**
```bash
cd api-automation-testing
```

2. **Install dependencies:**
```bash
npm install
```

This will install:
- **jest** - Testing framework
- **axios** - HTTP client
- **chai** - Assertion library

---

## Configuration

Edit `config/config.js` to set your API configuration:

```javascript
module.exports = {
    baseURL: 'https://jsonplaceholder.typicode.com',  // Your API base URL
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    authToken: 'your-auth-token',  // For Bearer token authentication
    apiKey: 'your-api-key'          // For API key authentication
};
```

---

## Running Tests

### Run all tests:
```bash
npm test
```

### Run specific test file:
```bash
npm test -- 01_get.test.js
```

### Run tests with coverage:
```bash
npm test -- --coverage
```

### Run tests in watch mode:
```bash
npm test -- --watch
```

### Run tests with verbose output:
```bash
npm test -- --verbose
```

### Generate HTML report:
```bash
npm run test:report
```

### Open test report in browser:
```bash
npm run open:report
```

---

## Test Coverage

The test suite covers the following areas:

| Area | Coverage |
|------|----------|
| **HTTP Methods** | GET, POST, PUT, PATCH, DELETE |
| **Request Types** | Fetch, Create, Update (full), Update (partial), Delete |
| **Headers** | Content-Type, Cache-Control, Authorization, Custom headers |
| **Authentication** | Bearer Token, API Key, Basic Auth |
| **Parameters** | Query parameters, Path parameters, Nested resources |
| **Validation** | Schema validation, Response structure, Data types |
| **Error Handling** | 404 errors, Invalid data, Malformed requests, Timeouts |

---

## Test Files Description

### 📋 01_get.test.js - GET Request Tests
**Tests fetching data from the API**
- Get all users
- Get specific user by ID
- Get all posts
- Response validation (status, data structure, response time)

### 📝 02_post.test.js - POST Request Tests
**Tests creating new resources**
- Create new user with valid data
- Create new post
- Response data verification
- Content-Type header validation
- Handle various data types (large text, special characters)

### 🔄 03_put.test.js - PUT Request Tests (Full Update)
**Tests complete resource replacement**
- Full user update
- Full post update
- Verify all fields are replaced

### ✏️ 04_patch.test.js - PATCH Request Tests (Partial Update)
**Tests partial resource updates**
- Update only name field
- Update only email field
- Update post title
- Verify other fields remain unchanged

### 🗑️ 05_delete.test.js - DELETE Request Tests
**Tests resource deletion**
- Delete user
- Delete post
- Delete comment
- Verify empty response

### 📨 06_headers.test.js - HTTP Headers Testing
**Tests request and response headers**
- Verify response headers (Content-Type, Cache-Control)
- Send custom headers
- Authorization headers (Bearer, API Key)
- Accept header for response format

### 🔍 07_params.test.js - Query Parameters Testing
**Tests URL parameters and filtering**
- Query parameters (userId, postId)
- Nested resources (/users/1/posts)
- Multiple parameters
- Dynamic parameter testing

### 🔐 08_auth.test.js - Authentication Testing
**Tests various authentication methods**
- Bearer token authentication
- API Key authentication (header and query)
- Basic authentication
- Public vs protected endpoints

### 📐 09_schema.test.js - Schema Validation Tests
**Tests response structure and data types**
- User object schema validation
- Post object schema validation
- Nested object structure (address, company, geo)
- Array response validation
- Email format validation

### ❌ 10_negative.test.js - Negative Test Cases
**Tests error scenarios and edge cases**
- 404 Not Found scenarios
- Invalid data handling (string ID, negative ID)
- Malformed requests (invalid JSON)
- Very long URL parameters
- Timeout handling
- Wrong HTTP methods

---

## Reports

### Generate Test Report

After running tests, generate an HTML report:
```bash
npm run test:report
```

### View Test Report

Open the generated report in a browser:
```bash
npm run open:report
```

The report includes:
- ✅ Passed tests
- ❌ Failed tests
- ⏭️ Skipped tests
- 📊 Test statistics
- ⏱️ Execution time
- 📋 Detailed test results

---

## Test Data

Test data is managed in `data/testData.json`:

```json
{
  "validUser": {
    "name": "Test User",
    "username": "testuser",
    "email": "test@example.com",
    "phone": "01899999999",
    "website": "example.com"
  }
}
```

---

## Best Practices

1. **Organize Tests**: Tests are organized by HTTP method and functionality
2. **Descriptive Names**: Test names clearly describe what is being tested
3. **Reusable Data**: Test data is stored in a separate JSON file
4. **Configuration Centralization**: API configuration is centralized in `config.js`
5. **Comprehensive Coverage**: Tests cover happy path, edge cases, and error scenarios
6. **Assertion Libraries**: Uses Chai for clear and readable assertions
7. **Error Handling**: Tests handle both success and error responses

---

## Common Issues & Troubleshooting

### Tests failing due to network issues
- Check if the API endpoint is accessible
- Verify your internet connection
- Check `config/config.js` for correct base URL

### Timeout errors
- Increase timeout in axios configuration
- Check if API is responding slowly
- Verify network connectivity

### Port already in use
- If running a local API, ensure port is not in use
- Change port in configuration

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| jest | ^27.0.0+ | Test runner and framework |
| axios | ^0.21.0+ | HTTP client for API requests |
| chai | ^4.3.0+ | Assertion library |

---

## Scripts in package.json

```json
{
  "test": "jest",
  "test:report": "jest --reporters=default --reporters=jest-html-reporter",
  "open:report": "start ./reports/API_Test_Report.html"
}
```

---

## API Used for Testing

This project uses **JSONPlaceholder** (https://jsonplaceholder.typicode.com) - a fake online REST API for testing and prototyping.

**Available Resources:**
- `/users` - User data
- `/posts` - Blog posts
- `/comments` - Post comments
- `/todos` - User todos

---

## Contributing

To add new tests:

1. Create a new test file in `test/api/`
2. Follow the naming convention: `XX_<feature>.test.js`
3. Use existing test structure as template
4. Add test data to `data/testData.json` if needed
5. Run tests and verify they pass

---

## License

MIT License - Feel free to use this project for testing purposes.

---

## Contact & Support

For issues or questions regarding this project, please create an issue in your repository.

---

**Happy Testing! 🚀**
