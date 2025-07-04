import ProductController from '../ProductController.js';
import ProductRepository from '../ProductRepository.js';
import productEventService from '../../../events/ProductEventService.js';

// Mock dependencies
jest.mock('../ProductRepository.js');
jest.mock('../../../events/ProductEventService.js');

describe('ProductController', () => {
    let mockRequest;
    let mockResponse;
    let mockNext;

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();

        // Setup mock request
        mockRequest = {
            body: {
                name: 'Test Product',
                description: 'Test Description',
                brand: 'Test Brand',
                price: '99.99',
                categoryId: '1',
                rate: '4',
                stock: '100'
            },
            files: []
        };

        // Setup mock response
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Setup mock next function
        mockNext = jest.fn();
    });

    describe('store', () => {
        it('should create a product and emit event successfully', async () => {
            // Mock the repository response
            const mockProduct = {
                id: 1,
                name: 'Test Product',
                description: 'Test Description',
                brand: 'Test Brand',
                price: 99.99,
                categoryId: 1,
                rate: 4,
                stock: 100,
                images: [],
                category: { id: 1, name: 'Test Category' }
            };

            ProductRepository.createProduct.mockResolvedValue(mockProduct);
            productEventService.emit.mockImplementation(() => {});

            await ProductController.store(mockRequest, mockResponse, mockNext);

            // Verify repository was called
            expect(ProductRepository.createProduct).toHaveBeenCalledWith(mockRequest);

            // Verify event was emitted
            expect(productEventService.emit).toHaveBeenCalledWith('product:created', mockProduct);

            // Verify response
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Product created successfully',
                product: mockProduct
            });

            // Verify next was not called (no errors)
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should handle repository errors', async () => {
            // Mock repository error
            const mockError = new Error('Database error');
            ProductRepository.createProduct.mockRejectedValue(mockError);

            await ProductController.store(mockRequest, mockResponse, mockNext);

            // Verify next was called with the error
            expect(mockNext).toHaveBeenCalledWith(mockError);

            // Verify response was not sent
            expect(mockResponse.status).not.toHaveBeenCalled();
            expect(mockResponse.json).not.toHaveBeenCalled();

            // Verify event was not emitted
            expect(productEventService.emit).not.toHaveBeenCalled();
        });

        it('should handle event emission errors', async () => {
            // Mock successful product creation
            const mockProduct = {
                id: 1,
                name: 'Test Product'
            };
            ProductRepository.createProduct.mockResolvedValue(mockProduct);

            // Mock event emission error
            const mockError = new Error('Event emission failed');
            productEventService.emit.mockImplementation(() => {
                throw mockError;
            });

            await ProductController.store(mockRequest, mockResponse, mockNext);

            // Verify next was called with the error
            expect(mockNext).toHaveBeenCalledWith(mockError);

            // Verify response was not sent
            expect(mockResponse.status).not.toHaveBeenCalled();
            expect(mockResponse.json).not.toHaveBeenCalled();
        });
    });
}); 