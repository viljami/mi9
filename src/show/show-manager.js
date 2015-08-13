
function getDetails(show){
  if (!show.drm || show.episodeCount <= 0) return;
  return {
    image: show.image && show.image.showImage,
    slug: show.slug,
    title: show.title
  };
}

module.exports = {
  filter: function(shows){
    return {
      response: shows.map(getDetails).filter(function(a){ return !!a; })
    };
  }
};
