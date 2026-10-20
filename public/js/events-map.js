(function () {
  var frames = document.querySelectorAll('.event-map-frame[data-location]');
  if (!frames.length) return;

  var fallbackSrc = 'https://www.openstreetmap.org/export/embed.html?bbox=-8,49,2,60&layer=mapnik';

  frames.forEach(function (frame) {
    var query = frame.getAttribute('data-location') || '';
    if (!query) {
      frame.src = fallbackSrc;
      return;
    }

    fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + encodeURIComponent(query))
      .then(function (response) { return response.json(); })
      .then(function (data) {
        if (!Array.isArray(data) || data.length === 0) {
          frame.src = fallbackSrc;
          return;
        }

        var lat = Number(data[0].lat);
        var lon = Number(data[0].lon);
        if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
          frame.src = fallbackSrc;
          return;
        }

        var delta = 0.01;
        var left = lon - delta;
        var right = lon + delta;
        var top = lat + delta;
        var bottom = lat - delta;

        frame.src =
          'https://www.openstreetmap.org/export/embed.html?bbox=' +
          left + ',' + bottom + ',' + right + ',' + top +
          '&marker=' + lat + ',' + lon + '&layer=mapnik';
      })
      .catch(function () {
        frame.src = fallbackSrc;
      });
  });
})();
