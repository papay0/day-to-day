var self = module.exports = {
  formatDate: function (dateTimestamp) {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateTimestamp).toLocaleString("en-US", options);
    return formattedDate;
  },
  getClearDate: function (date) {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const formattedDate = self.formatDate(date);
    if (self.formatDate(today) === formattedDate) {
      return "Today";
    } else if (self.formatDate(tomorrow) === formattedDate) {
      return "Tomorrow";
    } else if (self.formatDate(tomorrow) === formattedDate) {
      return "Yesterday";
    } else {
      return formattedDate;
    }
  }
};