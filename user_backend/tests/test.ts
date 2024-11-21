import axios from "axios";

const BASE_URL = "http://localhost:3000";

const testChat = async () => {
    try {
        console.log("\nTesting GET /api/chat endpoint...");
        const query = "What essences do you have for someone feeling stressed about work?";
        const chatResponse = await axios.get(`${BASE_URL}/api/chat?query=${encodeURIComponent(query)}`);
        console.log("Chat response:", chatResponse.data);
    } catch (error: any) {
        console.error("Error:", error.response?.data || error.message);
    }
}

// Run the test
console.log("Starting endpoint tests...\n");
(async () => {
    await testChat();
})();
