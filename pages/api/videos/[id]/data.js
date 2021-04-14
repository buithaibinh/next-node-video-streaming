import videos from '@/assets/mock';

// make request for a particular video
/**
 * api/video/1/data
 */
export default (req, res) => {
  const id = req.query.id;
  const video = videos.find((video) => (video.id === id));
  if (video) {
    res.status(200).json(video);
  } else {
    res.status(404).json({ message: `Video with id: ${id} not found.` })
  }
};
