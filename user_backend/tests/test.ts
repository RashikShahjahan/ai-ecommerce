import axios from "axios";

const BASE_URL = "http://localhost:3000";

const testChat = async () => {
    try {
        console.log("\nTesting chat conversation flow...");
        
        // First message in conversation 1
        const query1 = "What essences do you have for someone feeling stressed about work?";
        const chat1Response1 = await axios.get(
            `${BASE_URL}/api/chat?query=${encodeURIComponent(query1)}&chatId=conversation1`
        );
        console.log("Chat 1 - Message 1:", chat1Response1.data);

        // Follow-up message in conversation 1
        const query2 = "Can you recommend a specific essence from those options?";
        const chat1Response2 = await axios.get(
            `${BASE_URL}/api/chat?query=${encodeURIComponent(query2)}&chatId=conversation1`
        );
        console.log("Chat 1 - Message 2:", chat1Response2.data);

        // New conversation with different chat ID
        const query3 = "I'm having trouble sleeping. What would you recommend?";
        const chat2Response = await axios.get(
            `${BASE_URL}/api/chat?query=${encodeURIComponent(query3)}&chatId=conversation2`
        );
        console.log("Chat 2 - Message 1:", chat2Response.data);
    } catch (error: any) {
        console.error("Error:", error.response?.data || error.message);
    }
}

// Run the test
console.log("Starting endpoint tests...\n");
(async () => {
    await testChat();
})();
