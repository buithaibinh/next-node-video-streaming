import videos from '@/assets/mock';
import fs from 'fs';
import path from 'path'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

// make request for a particular video
/**
 * api/video/1/data
 */
export default (req, res) => {
  const id = req.query.id;
  const video = videos.find((video) => video.id === id);
  if (video) {
    // const data = fs.readFileSync(`./assets/captions/${id}.vtt`);
    const data = fs.readFileSync(path.join(serverRuntimeConfig.PROJECT_ROOT, `./assets/captions/${id}.vtt`))
    res.send(data);
  } else {
    res.status(404).json({ msg: 'Not found' });
  }
};
