import { PrismaClient } from '@prisma/client';
import ProductRepository from '../ProductRepository.js';
import RedisCahce from '../../../utils/cache/redis.cache.js';

// Mock PrismaClient
jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn(() => ({
        product: {
            create: jest.fn(),
            findUnique: jest.fn(),
            productImage: {
                createMany: jest.fn()
            }
        }
    }))
}));

// Mock RedisCache
jest.mock('../../../utils/cache/redis.cache.js', () => ({
    get: jest.fn(),
    set: jest.fn()
}));

// Mock Resize class
jest.mock('../../../utils/Resize.js', () => {
    return jest.fn().mockImplementation(() => ({
        save: jest.fn().mockResolvedValue('test-image.jpg')
    }));
});

describe('ProductRepository', () => {
    let prisma;
    let mockRequest;

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
        
        // Get the mocked prisma instance
        prisma = new PrismaClient();

        // Setup mock request object
        mockRequest = {
            body: {
                name: 'Test Product',
                description: 'Test Description',
                brand: 'Test Brand',
                price: '99.99',
                categoryId: '1',
                rate: '4',
                stock: '100',
                icon: 'test-icon.jpg',
                image: 'test-image.jpg'
            },
            files: [
                {
                    buffer: Buffer.from('test-image-data'),
                    originalname: 'test1.jpg'
                },
                {
                    buffer: Buffer.from('test-image-data-2'),
                    originalname: 'test2.jpg'
                }
            ]
        };
    });

    describe('createProduct', () => {
        it('should create a product with all fields', async () => {
            // Mock the database responses
            const mockProduct = {
                id: 1,
                name: 'Test Product',
                description: 'Test Description',
                brand: 'Test Brand',
                price: 99.99,
                categoryId: 1,
                rate: 4,
                stock: 100,
                icon: 'test-icon.jpg',
                image: 'test-image.jpg'
            };

            const mockProductWithRelations = {
                ...mockProduct,
                images: [
                    { id: 1, image: 'test-image.jpg', productId: 1 }
                ],
                category: {
                    id: 1,
                    name: 'Test Category'
                }
            };

            prisma.product.create.mockResolvedValue(mockProduct);
            prisma.product.findUnique.mockResolvedValue(mockProductWithRelations);
            prisma.productImage.createMany.mockResolvedValue({ count: 2 });

            const result = await ProductRepository.createProduct(mockRequest);

            // Verify the result
            expect(result).toEqual(mockProductWithRelations);
            
            // Verify database calls
            expect(prisma.product.create).toHaveBeenCalledWith({
                data: {
                    name: 'Test Product',
                    description: 'Test Description',
                    brand: 'Test Brand',
                    price: 99.99,
                    categoryId: 1,
                    rate: 4,
                    stock: 100,
                    icon: 'test-icon.jpg',
                    image: 'test-image.jpg'
                }
            });

            // Verify product images were created
            expect(prisma.productImage.createMany).toHaveBeenCalledWith({
                data: [
                    { image: 'test-image.jpg', productId: 1 },
                    { image: 'test-image.jpg', productId: 1 }
                ]
            });
        });

        it('should create a product with minimal required fields', async () => {
            // Mock request with only required fields
            const minimalRequest = {
                body: {
                    name: 'Test Product',
                    price: '99.99',
                    categoryId: '1'
                },
                files: []
            };

            const mockProduct = {
                id: 1,
                name: 'Test Product',
                price: 99.99,
                categoryId: 1,
                description: null,
                brand: null,
                rate: null,
                stock: null,
                icon: null,
                image: null
            };

            const mockProductWithRelations = {
                ...mockProduct,
                images: [],
                category: {
                    id: 1,
                    name: 'Test Category'
                }
            };

            prisma.product.create.mockResolvedValue(mockProduct);
            prisma.product.findUnique.mockResolvedValue(mockProductWithRelations);

            const result = await ProductRepository.createProduct(minimalRequest);

            // Verify the result
            expect(result).toEqual(mockProductWithRelations);
            
            // Verify database calls
            expect(prisma.product.create).toHaveBeenCalledWith({
                data: {
                    name: 'Test Product',
                    price: 99.99,
                    categoryId: 1,
                    description: null,
                    brand: null,
                    rate: null,
                    stock: null,
                    icon: null,
                    image: null
                }
            });

            // Verify no product images were created
            expect(prisma.productImage.createMany).not.toHaveBeenCalled();
        });

        it('should handle database errors gracefully', async () => {
            // Mock a database error
            prisma.product.create.mockRejectedValue(new Error('Database error'));

            // Expect the error to be thrown
            await expect(ProductRepository.createProduct(mockRequest))
                .rejects
                .toThrow('Database error');
        });
    });
}); 