const mapKeyValueEvent = (ids = [], event = '') => {
  return ids.reduce((acc, id) => {
    return {
      ...acc,
      [id]: event,
    }
  }, {});
}

module.exports = mapKeyValueEvent;