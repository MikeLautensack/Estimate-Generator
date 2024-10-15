import Handlebars from "handlebars/runtime";

// Register any helpers you need
Handlebars.registerHelper("uppercase", function (str) {
  return str.toUpperCase();
});

// Export the Handlebars instance
export default Handlebars;
