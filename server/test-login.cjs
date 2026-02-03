const axios = require('axios');

async function testLogin() {
    try {
        console.log("Testing Login...");
        const response = await axios.post('http://localhost:5001/api/login', {
            username: 'admin',
            password: 'admin123'
        });
        console.log("Login Success:", response.data);
    } catch (error) {
        console.error("Login Failed Message:", error.message);
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        } else {
            console.error("No response received");
        }
    }
}

testLogin();
