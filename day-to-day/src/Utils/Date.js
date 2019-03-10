module.exports = {
  formatDate: function (dateTimestamp) {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateTimestamp).toLocaleString("en-US", options);
  }
};