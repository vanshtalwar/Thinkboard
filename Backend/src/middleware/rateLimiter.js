import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-limit-key");

        if (!success) {
            return res.status(429).json({
                message: "Too many requests, please slow down."
            });
        }

        next();
    }

    catch (err) {
        console.error("Rate limiter error:", err);
        next();
    }
};

export default rateLimiter