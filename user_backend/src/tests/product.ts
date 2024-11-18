import prisma from "../../prisma/client";
import axios from "axios";

const BASE_URL = "http://localhost:3000"; // adjust port if different

async function testGetProductByIdEndpoint() {
  try {
    // 1. First create a test category (required for product)
    const testCategory = await prisma.category.create({
      data: {
        name: "Test Category",
        description: "A test category description",
        slug: `test-category-${Date.now()}`
      }
    });

    // Create test product with all required fields
    console.log("Creating test product...");
    const testProduct = await prisma.product.create({
      data: {
        name: "Test Product",
        description: "A test product description",
        imageUrl: "https://example.com/test-image.jpg",
        featured: false,
        categoryId: testCategory.id,
        variants: {
          create: [
            {
              color: "Blue",
              size: "M",
              sku: `TEST-SKU-${Date.now()}`,
              stock: 100,
              price: 99.99
            }
          ]
        }
      },
      include: {
        category: true,
        variants: true
      }
    });
    console.log("Created product:", testProduct);

    // 2. Test GET endpoint for existing product
    console.log("\nTesting GET api/products/:productId endpoint...");
    const response = await axios.get(`${BASE_URL}/api/products/${testProduct.id}`);
    console.log("GET Response:", response.data);

    // Test GET endpoint for non-existent product
    console.log("\nTesting GET api/products/:productId with invalid ID...");
    try {
      await axios.get(`${BASE_URL}/api/products/999999`);
      console.log("❌ Error: Should have thrown 404 error");
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.log("✅ Successfully received 404 for non-existent product");
      } else {
        console.log("❌ Unexpected error:", error.response?.data || error.message);
      }
    }

    // 3. Clean up - update cleanup to delete related records
    console.log("\nCleaning up test data...");
    await prisma.productVariant.deleteMany({
      where: { productId: testProduct.id }
    });
    await prisma.product.delete({
      where: { id: testProduct.id }
    });
    await prisma.category.delete({
      where: { id: testCategory.id }
    });
    console.log("Test data deleted");

  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the tests
console.log("Starting endpoint tests...\n");
testGetProductByIdEndpoint();
