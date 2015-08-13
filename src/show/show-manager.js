
function getDetails(show){
  var o = {
    image: show.image && show.image.showImage,
    slug: show.slug,
    title: show.title
  };

  if (show.drm && show.episodeCount > 0) o.drm = true;

  return o;
}

module.exports = {
  filter: function(shows){
    return {
      response: shows.map(getDetails)
    };
  }
};
