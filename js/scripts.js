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

var itemPrice = function(item) {
  var items = {
    "Large": 16,
    "Medium": 12,
    "Small": 8
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
      $("table#show-pizza tbody").append("<tr><td class='topping'>" + element + "</td><td class='money'>+$1</td></tr>");
    });
    $("td#total-price").text("$" + pizza.price().toFixed());
    $("#order-form").hide();
    $("#order-confirmation").show();
  });
});
