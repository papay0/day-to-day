var self = (module.exports = {
  formatDate: function(dateTimestamp) {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    const formattedDate = new Date(dateTimestamp).toLocaleString(
      "en-US",
      options
    );
    return formattedDate;
  },
  getClearDate: function(date) {
    const today = self.getToday();
    const tomorrow = self.getTomorrow();
    const yesterday = self.getYesterday();
    const formattedDate = self.formatDate(date);
    if (self.formatDate(today) === formattedDate) {
      return "Today";
    } else if (self.formatDate(tomorrow) === formattedDate) {
      return "Tomorrow";
    } else if (self.formatDate(yesterday) === formattedDate) {
      return "Yesterday";
    } else {
      return formattedDate;
    }
  },
  getToday: function() {
    return new Date(new Date().setHours(0, 0, 0, 0)).getTime();
  },
  getTomorrow: function() {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    return new Date(tomorrow.setHours(0, 0, 0, 0)).getTime();
  },
  getYesterday: function() {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() - 1);
    return new Date(tomorrow.setHours(0, 0, 0, 0)).getTime();
  }
});
