import videos from '@/assets/mock';
import rateLimit from '@/utils/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

// get list of video
/** api/videos */
export default async function handler(req, res) {
  try {
    await limiter.check(res, 100, 'CACHE_TOKEN'); // 100 requests per minute
    res.status(200).json(videos);
  } catch {
    res.status(429).json({ error: 'Rate limit exceeded' });
  }
}
