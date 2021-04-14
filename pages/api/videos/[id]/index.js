import fs from 'fs';
import path from 'path'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

//streaming route
/**
 * api/video/1
 */
export default (req, res) => {

  const videoPath = path.join(serverRuntimeConfig.PROJECT_ROOT, `./assets/${req.query.id}.mp4`)

  const videoStat = fs.statSync(videoPath);
  const fileSize = videoStat.size;
  const videoRange = req.headers.range;
  if (videoRange) {
    const parts = videoRange.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
};
