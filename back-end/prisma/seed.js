import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const userData = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: "secure123"
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: "secure456"
  }
];

const categoryData = [
  {
    name: 'smartphones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=219&h=200&fit=crop',
    icon: 'mobile',
  },
  {
    name: 'laptops',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=219&h=200&fit=crop',
    icon: 'laptop',
  },
  {
    name: 'furniture',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=219&h=200&fit=crop',
    icon: 'couch',
  },
  {
    name: 'womens-shoes',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=219&h=200&fit=crop',
    icon: 'shoe-prints',
  },
  {
    name: 'womens-dresses',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=219&h=200&fit=crop',
    icon: 'person-dress',
  },
  {
    name: 'womens-jewellery',
    image: 'https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=219&h=200&fit=crop',
    icon: 'gem',
  },
  {
    name: 'motorcycle',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=219&h=200&fit=crop',
    icon: 'motorcycle',
  },
  {
    name: 'mens-watches',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=219&h=200&fit=crop',
    icon: 'clock',
  }
];

async function main() {
  console.log(`🌱 Starting seeding ...`);

  // Delete existing data
  // await prisma.image.deleteMany();
  // await prisma.product.deleteMany();
  // await prisma.category.deleteMany();
  // await prisma.user.deleteMany();

  // Create users
  for (const u of userData) {
    const user = await prisma.user.create({ data: u });
    console.log(`✅ Created user: ${user.email}`);
  }

  // Create categories and products
  for (const cat of categoryData) {
    const category = await prisma.category.create({ data: cat });
    console.log(`📁 Created category: ${category.name}`);

    // Create 5 products per category
    for (let i = 0; i < 1000; i++) {
      const product = await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          brand: faker.company.name(),
          stock: faker.number.int({ min: 10, max: 100 }),
          rate: faker.number.int({ min: 3, max: 5 }),
          icon: category.icon,
          description: faker.commerce.productDescription(),
          price: Number(faker.commerce.price({ min: 50, max: 2000 })),
          image: `https://picsum.photos/seed/product-${faker.string.uuid()}/600/600`,
          categoryId: category.id,
          images: {
            create: [...Array(4)].map(() => ({
              image: `https://picsum.photos/seed/gallery-${faker.string.uuid()}/600/600`
            }))
          }
        }
      });

      console.log(`🛍️  Created product: ${product.name} (${category.name})`);
    }
  }

  console.log(`✅ Seeding complete!`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
