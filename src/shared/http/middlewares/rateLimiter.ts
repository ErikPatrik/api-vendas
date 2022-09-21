import { Request, Response, NextFunction, response } from 'express'
import Redis from 'ioredis'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import AppError from '../../errors/AppError'

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const redisClient = new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            password: process.env.REDIS_PASSWORD || undefined,
        })

        const limiter = new RateLimiterRedis({
            storeClient: redisClient,
            keyPrefix: 'ratelimit',
            points: 1, // number of request per IP
            duration: 1 // seconds
        })

        await limiter.consume(request.ip)

        return next()
    } catch (err) {
        throw new AppError('Too many requests.', 429)
    }
}
