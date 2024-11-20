import { findSimilarDocuments, storeEssenceEmbedding } from "./embeddings";

async function runTests() {
    try {
        // First store some test data
        const testData = [
            { 
                id: 'test1', 
                name: 'Happy Vibes Premium',
                description: 'Capture the essence of pure joy and boundless energy',
                price: 29.99,
                stock: 100,
            },
            { 
                id: 'test2', 
                name: 'Melancholy Deluxe',
                description: 'Experience the depths of thoughtful sadness',
                price: 24.99,
                stock: 75,
            },
            { 
                id: 'test3', 
                name: 'Lost Joy Extract',
                description: 'The essence of missing what once brought happiness',
                price: 19.99,
                stock: 50,
            },
        ];

        console.log('Storing test data...\n');
        for (const data of testData) {
            await storeEssenceEmbedding(data.id, data.description+data.name);
            console.log(`Stored: ${data.name}`);
        }

        console.log('\nTesting similarity search...');
        const query = 'love?';
        const results = await findSimilarDocuments(query, 2);
        
        console.log('\nQuery:', query);
        console.log('\nSimilar essences found:');
        results.forEach((essence, index) => {
            console.log(`\n${index + 1}. ${essence.name}`);
            console.log(`   Description: ${essence.description}`);
            console.log(`   Price: $${essence.price}`);
            console.log(`   Stock: ${essence.stock}`);
            console.log(`   Similarity Score: ${essence.distance.toFixed(3)}`);
        });
    } catch (error) {
        console.error('Test failed:', error);
    }
}

runTests();