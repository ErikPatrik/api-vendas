import Redis, { Redis as RedisClient } from 'ioredis'
import cacheConfig from '../../config/cache'

export default class RedisCache {
	private client: RedisClient

	constructor() {
		this.client = new Redis(cacheConfig.config.redis)
	}

	public async save(key: string, value: any): Promise<void> { // metod set Redis
		await this.client.set(key, JSON.stringify(value))
	}

	public async recover<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key)

        if (!data) {
            return null
        }

        const parsedData = JSON.parse(data) as T // return the default type

        return parsedData
    }

	public async invalidate(key: string): Promise<void> { // metod to exclude cache
        await this.client.del(key)
    }
}
