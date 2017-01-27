// Business logic
function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
}

Pizza.prototype.price = function() {
  var total = 0;
  
  if (this.size.includes('Large'))
    total += 16;
  else if (this.size.includes('Medium'))
    total += 12;
  else if (this.size.includes('Small'))
    total += 8;
  else {
    return NaN;
  }

  total += this.toppings.length;
  return total;
};
