import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

const userData = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    password: "123456"
  }
]

const categoryData = [
  {
    name: 'smartphones',
    image: faker.image.fashion(219, 200, true),
    icon: 'mobile',
  },
  {
    name: 'laptops',
    image: faker.image.fashion(219, 200, true),
    icon: 'laptop',
  },
  {
    name: 'furniture',
    image: faker.image.fashion(219, 200, true),
    icon: 'couch',
  },
  {
    name: 'womens-shoes',
    image: faker.image.fashion(219, 200, true),
    icon: 'shoe-prints',
  },
  {
    name: 'womens-dresses',
    image: faker.image.fashion(219, 200, true),
    icon: 'person-dress',
  },
  {
    name: 'womens-jewellery',
    image: faker.image.fashion(219, 200, true),
    icon: 'gem',
  },
  {
    name: 'motorcycle',
    image: faker.image.fashion(219, 200, true),
    icon: 'motorcycle',
  },
  {
    name: 'mens-watches',
    image: faker.image.fashion(219, 200, true),
    icon: 'clock',
  }
]

const products = [...Array(100)].map(() => ({
  name: faker.commerce.productName(),
  brand: faker.commerce.department(),
  stock: faker.datatype.number({ max: 100 }) ,
  rate: faker.datatype.number({ max: 5 }) ,
  icon: 'laptop',
  image: faker.image.food(1024, 724, true),
  description: faker.commerce.productDescription(),
  price: Number(faker.commerce.price()),
}));

async function main() {
  console.log(`Start seeding ...`)
  // await prisma.user.deleteMany()
  // await prisma.category.deleteMany()
  // await prisma.product.deleteMany()
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  for (var i=0; i < categoryData.length; i++) {
    const category = await prisma.category.create({
      data: categoryData[i],
    })
    products[i].categoryId = category.id
    const product = await prisma.product.create({
      data: products[i],
    })
    console.log(`Created category with id: ${category.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })