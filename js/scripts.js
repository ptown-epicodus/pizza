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

  this.toppings.forEach(function(element) {
    total += itemPrice(element);
  });

  return total;
};

var itemPrice = function(item) {
  var items = {
    // Sizes
    "Large": 16,
    "Medium": 12,
    "Small": 8,
    // Meat toppings
    "pepperoni": 2,
    "sausage": 2,
    "ham": 2,
    "bacon": 2,
    // Veggie toppings
    "mushrooms": 1,
    "onions": 1,
    "olives": 1,
    "peppers": 1,
    "pineapple": 1
  };

  return items[item];
};


// Interface logic
var pizza;

$(document).ready(function() {
  $("form#new-pizza").submit(function(event) {
    event.preventDefault();

    var size, toppings = [ ];
    size = $("#new-size").val();
    $("input:checkbox[name=topping-choice]:checked").each(function() {
      toppings.push($(this).val());
    });

    pizza = new Pizza(size, toppings);

    $(".price").text(pizza.price().toFixed());
    $("table#show-pizza tbody").append("<tr><td>" + pizza.size + " pizza</td><td class='money'>$" + itemPrice(pizza.size).toFixed() + "</td></tr>");
    pizza.toppings.forEach(function(element) {
      $("table#show-pizza tbody").append("<tr><td class='topping'>" + element + "</td><td class='money'>+$"+ itemPrice(element).toFixed() + "</td></tr>");
    });
    $("td#total-price").text("$" + pizza.price().toFixed());
    $("#order-form").hide();
    $("#order-confirmation").show();
  });
});
