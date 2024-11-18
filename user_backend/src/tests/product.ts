import prisma from "../../prisma/client";
import axios from "axios";

const BASE_URL = "http://localhost:3000"; // adjust port if different

// Add helper functions at the top
async function ensureTestCategory(categoryNum = 1) {
  const slug = `test-category-${categoryNum}`;
  let category = await prisma.category.findFirst({ where: { slug } });
  
  if (!category) {
    category = await prisma.category.create({
      data: {
        name: `Test Category ${categoryNum}`,
        description: `A test category ${categoryNum} description`,
        slug
      }
    });
  }
  return category;
}

async function clearTestData() {
  console.log("Clearing test data...");
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  console.log("Test data cleared");
}

async function testGetProductEndpoint() {
  try {
    // Modified to use helper function
    const testCategory = await ensureTestCategory();

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

    // Modified cleanup - only delete the product and its variants, keep the category
    console.log("\nCleaning up test data...");
    await prisma.productVariant.deleteMany({
      where: { productId: testProduct.id }
    });
    await prisma.product.delete({
      where: { id: testProduct.id }
    });
    console.log("Test data deleted");

  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
  } finally {
    await prisma.$disconnect();
  }
}

const testFilterProductsEndpoint = async () => {
    try {
        // Create test category
        const testCategory = await ensureTestCategory();

        // Create multiple test products with different attributes
        console.log("Creating test products...");
        const testProducts = await Promise.all([
            prisma.product.create({
                data: {
                    name: "Test Product 1",
                    description: "Featured product",
                    imageUrl: "https://example.com/test-image1.jpg",
                    featured: true,
                    categoryId: testCategory.id,
                    variants: {
                        create: [{
                            color: "Blue",
                            size: "M",
                            sku: `TEST-SKU-1-${Date.now()}`,
                            stock: 100,
                            price: 99.99
                        }]
                    }
                },
                include: {
                    category: true,
                    variants: true
                }
            }),
            prisma.product.create({
                data: {
                    name: "Test Product 2",
                    description: "Non-featured product",
                    imageUrl: "https://example.com/test-image2.jpg",
                    featured: false,
                    categoryId: testCategory.id,
                    variants: {
                        create: [{
                            color: "Red",
                            size: "L",
                            sku: `TEST-SKU-2-${Date.now()}`,
                            stock: 50,
                            price: 149.99
                        }]
                    }
                },
                include: {
                    category: true,
                    variants: true
                }
            })
        ]);
        console.log("Created products:", testProducts);

        // Test different filter scenarios
        console.log("\nTesting GET api/products with filters...");
        
        // Test featured filter
        const featuredResponse = await axios.get(`${BASE_URL}/api/products?featured=true`);
        console.log("Featured products response:", featuredResponse.data);
        
        // Test category filter
        const categoryResponse = await axios.get(`${BASE_URL}/api/products?categoryId=${testCategory.id}`);
        console.log("Category filter response:", categoryResponse.data);
        
        // Test price range filter
        const priceResponse = await axios.get(`${BASE_URL}/api/products?minPrice=100&maxPrice=200`);
        console.log("Price range filter response:", priceResponse.data);

        // Clean up test data
        console.log("\nCleaning up test data...");
        for (const product of testProducts) {
            await prisma.productVariant.deleteMany({
                where: { productId: product.id }
            });
            await prisma.product.delete({
                where: { id: product.id }
            });
        }
        console.log("Test data deleted");

    } catch (error: any) {
        console.error("Error:", error.response?.data || error.message);
    } finally {
        await prisma.$disconnect();
    }
}


// Run the tests
console.log("Starting endpoint tests...\n");
(async () => {
  try {
    await clearTestData(); // Clear before tests
    await Promise.all([
      testGetProductEndpoint(),
      testFilterProductsEndpoint()
    ]);
  } finally {
    await clearTestData(); // Clear after tests
    await prisma.$disconnect();
  }
})();
