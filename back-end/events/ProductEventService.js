import EventEmitter from 'events';
import { logger } from '../utils/logger.js';

class ProductEventService extends EventEmitter {
    constructor() {
        super();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Listen for product creation
        this.on('product:created', async (product) => {
            try {
                // Log the event
                logger.info('Product created event received', { productId: product.id });

                // Here you can add multiple handlers for product creation
                await this.handleProductCreated(product);
                
                // You can add more handlers as needed
                // await this.notifyInventory(product);
                // await this.updateSearchIndex(product);
                // await this.sendNotifications(product);
            } catch (error) {
                logger.error('Error handling product:created event', { 
                    error: error.message,
                    productId: product.id 
                });
            }
        });
    }

    async handleProductCreated(product) {
        // Implement your business logic here
        // For example:
        // - Update cache
        // - Send notifications
        // - Update search index
        // - Update inventory
        logger.info('Processing product creation', { productId: product.id });
        
        // Add your implementation here
    }

    // Add more event handler methods as needed
    // async notifyInventory(product) { ... }
    // async updateSearchIndex(product) { ... }
    // async sendNotifications(product) { ... }
}

// Create a singleton instance
const productEventService = new ProductEventService();

// Export the singleton instance
export default productEventService; 