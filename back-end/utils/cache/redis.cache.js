import Redis from 'ioredis';
const redis = new Redis({ 
    host: process.env.REDIS_HOST || 'localhost',
    port: 6379,
});

/**
 * @typedef {import('./cache.interface.js').ICache} RedisCahce
 */
export default class RedisCahce {
    /**
     * Sets a key-value pair in Redis.
     * This method supports optional Redis-specific expiration parameters.
     * If `type` and `timer` are provided, the key will expire after the specified duration.
     *
     * @param {string} key - The key to store the value under.
     * @param {string} value - The value to store. It should be a string (e.g., JSON.stringify'd object).
     * @param {string} [type] - Optional. The expiration type, e.g., 'EX' for seconds, 'PX' for milliseconds.
     * @param {number} [timer] - Optional. The expiration time in units specified by `type`.
     * @returns {Promise<void>} A Promise that resolves when the operation is complete.
     */
    static async set(key , value, type, timer) {
        // ioredis's set command handles optional type and timer arguments gracefully.
        // If type and timer are undefined, it behaves like a simple set.
        await redis.set(key, value, type, timer);
    }

    /**
     * Retrieves a value from Redis by key.
     *
     * @param {string} key - The key of the value to retrieve.
     * @returns {Promise<string | null>} A Promise that resolves with the stored string value,
     *                                   or `null` if the key does not exist.
     */
    static async get(key) {
        const data = await redis.get(key);
        return data
    }

    /**
     * Checks if a key exists in Redis.
     *
     * @param {string} key - The key to check for existence.
     * @returns {Promise<boolean>} A Promise that resolves with `true` if the key exists,
     *                             `false` otherwise.
     */
    static async has(key) {
        const result = await redis.exists(key);
        return result === 1;
    }

}