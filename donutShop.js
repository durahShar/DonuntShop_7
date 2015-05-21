//Global variables
//Number of hours the shops are open
var numHours = 12;

function DonutShop(minCustomers, maxCustomers, numDonutsHour, hoursOfOperation){

  //Private Members
  var donutsPerHourArray = [];
  var minCust = minCustomers;
  var maxCust = maxCustomers;
  var donutsPerCustomer = numDonutsHour;
  var hoursOpen = hoursOfOperation;


  //Private Methods
  //Generate Data for the day based on hoursOfOperation argument.
  var generateShopData = function(){

    donutsPerHourArray = [];

    for (var i = 0; i < hoursOfOperation; i++) {
      var customersHour = randomInt(minCust, maxCust);
      var donutsSoldHour = customersHour * donutsPerCustomer;

      var hourObject = {}
        hourObject.customerHour = customersHour;
        hourObject.donutHour = donutsSoldHour;

      donutsPerHourArray.push(hourObject);
    };
  }

  //Public Methods
  this.updateShop = function(minCustomers, maxCustomers, numDonutsHour, hoursOfOperation){
    minCust = minCustomers;
    maxCust = maxCustomers;
    donutsPerCustomer = numDonutsHour;
    hoursOpen = hoursOfOperation;

    generateShopData();
  }
  //Returns the total number of donuts for the day
  this.donutsPerDay = function(){
    var totalDonuts = 0;
    for (var i = 0; i < donutsPerHourArray.length; i++) {
      totalDonuts += donutsPerHourArray[i].donutHour;
    };
    return Math.floor(totalDonuts);
  }

  //Returns the average donuts sold per hour
  this.averageDonutsPerHour = function(){
    var totalHours = 0;
    for (var i = 0; i < donutsPerHourArray.length; i++) {
      totalHours += donutsPerHourArray[i].donutHour;
    };

    return Math.floor(totalHours/hoursOpen);
  }

  //Returns the total number of customers for the day
  this.customersPerDay = function(){
    var totalCustomers = 0;
    for (var i = 0; i < donutsPerHourArray.length; i++) {
      totalCustomers += donutsPerHourArray[i].customerHour;
    };
    return Math.floor(totalCustomers);
  }

  //Returns the average number of customers hour
  this.averageCustomersPerHour = function(){
    var totalCustomers = 0;

    for (var i = 0; i < donutsPerHourArray.length; i++) {
      totalCustomers += donutsPerHourArray[i].customerHour;
    };

    return Math.floor(totalCustomers/hoursOpen);
  }

  //Private Utility methods
  //returns a int between min and max inclusive.
  function randomInt(min, max){
    return Math.ceil(Math.random() * (max - min + 1) + min);
  }

  //returns a number between min and max inclusive.
  function randomNumber(min, max){
    return Math.random() * (1 + max - min) + min;
  }

  //generate shop data
  generateShopData();
}

function ShopManager(){

  //Array containing list of shop objects
  var shopList = [];
  var donutImage = "";

  //Adds shops to the shopList array
  this.addShop = function(shopName, minCustomers, maxCustomers, numDonutsHour, operationHours){
    var shop = new DonutShop(minCustomers, maxCustomers, numDonutsHour, operationHours);
    var shopObject = {};
      shopObject.shopName = shopName;
      shopObject.shopData = shop;
    shopList.push(shopObject);
  }

  this.totalDonutsAllShops = function(){
    var totalAllShops = 0;
    for (var i = 0; i < shopList.length; i++) {
      totalAllShops += shopList[i].shopData.donutsPerDay();
    };
    return totalAllShops;
  }

  this.totalCustomersAllShops = function(){
     var totalAllShops = 0;
    for (var i = 0; i < shopList.length; i++) {
      totalAllShops += shopList[i].shopData.customersPerDay();
    };
    return totalAllShops;
  }

  this.addImageToReport = function(path){
    donutImage = path;
  }

  this.updateShopByIndex = function(index, minCustomers, maxCustomers, numDonutsHour, numHours){

    var shopData = shopList[index].shopData;
    shopData.updateShop(minCustomers, maxCustomers, numDonutsHour, numHours);

    shopList[index].shopData = shopData;
  }

  //Generate simple report
  this.generateReport = function(){
    var rowHeadings = ["Shop Names", "Average Donuts Hour", "Average Customers Hour", "Total Donuts", "Total Customers"];

    $("#report tr").remove();

    $("#report").append("<tr class='heading'></tr>");
    $(".heading").append("<th>" + rowHeadings[0] + "</th>");
    $(".heading").append("<th>" + rowHeadings[1] + "</th>");
    $(".heading").append("<th>" + rowHeadings[2] + "</th>");
    $(".heading").append("<th>" + rowHeadings[3] + "</th>");
    $(".heading").append("<th>" + rowHeadings[4] + "</th>");

    for (var i = 0; i < shopList.length; i++) {
      //shopList[i]
      //console.log(shopList[i].shopName+" Donut Shop");
      //console.log("Average Donuts Hour: " + shopList[i].shopData.averageDonutsPerHour());
      //console.log("Average Customers Hour: " +shopList[i].shopData.averageCustomersPerHour());
      //console.log("Total Donuts: " +shopList[i].shopData.donutsPerDay());
      //console.log("Total Customers: " +shopList[i].shopData.customersPerDay());
      //console.log("_________________________________");

      $("#report").append("<tr class='row" + i + "'></tr>");
      $(".row" + i).append("<th class="+ checkForEvenOdd(i) +">" + shopList[i].shopName + " Donut Shop</th>");

      $(".row" + i).append("<td class="+ checkForEvenOdd(i) +">" + shopList[i].shopData.averageDonutsPerHour()+"</td>");
      $(".row" + i).append("<td class="+ checkForEvenOdd(i) +">" + shopList[i].shopData.averageCustomersPerHour() + "</td>");
      $(".row" + i).append("<td class="+ checkForEvenOdd(i) +">" + shopList[i].shopData.donutsPerDay() + "</td>");
      $(".row" + i).append("<td class="+ checkForEvenOdd(i) +">" + shopList[i].shopData.customersPerDay() + "</td>");
    }
  };

  this.generateShopReport = function(index){
    var rowHeadings = ["Average Donuts Hour", "Average Customers Hour", "Total Donuts", "Total Customers"];

    $(".updateShopBtn").attr("data", index);

    $("#shopreport tr").remove();

    $("#shopreport").append("<tr class='shop" + 0 + "'></tr>");
      $(".shop" + 0).append("<td colspan='2' class='title'>" + shopList[index].shopName +" Donut Shop</td>");

    $("#shopreport").append("<tr class='shop" + 1 + "'></tr>");
      $(".shop" + 1).append("<th class="+ checkForEvenOdd(0) + ">" + rowHeadings[0] + ":</th>");
      $(".shop" + 1).append("<td class="+ checkForEvenOdd(0) + ">" + shopList[index].shopData.averageDonutsPerHour()+"</td>");

    $("#shopreport").append("<tr class='shop" + 2 + "'></tr>");
      $(".shop" + 2).append("<th class="+ checkForEvenOdd(1) + ">" + rowHeadings[1] + ":</th>");
      $(".shop" + 2).append("<td class="+ checkForEvenOdd(1) + ">" + shopList[index].shopData.averageCustomersPerHour() + "</td>");

    $("#shopreport").append("<tr class='shop" + 3 + "'></tr>");
      $(".shop" + 3).append("<th class="+ checkForEvenOdd(2) + ">" + rowHeadings[2] + ":</th>");
      $(".shop" + 3).append("<td class="+ checkForEvenOdd(2) + ">" + shopList[index].shopData.donutsPerDay() + "</td>");

    $("#shopreport").append("<tr class='shop" + 4 + "'></tr>");
      $(".shop" + 4).append("<th class="+ checkForEvenOdd(3) + ">" + rowHeadings[3] + ":</th>");
      $(".shop" + 4).append("<td class="+ checkForEvenOdd(3) + ">" + shopList[index].shopData.customersPerDay() + "</td>");
  }

  this.createShopButtons = function(){
    $(".nav div").remove();
    for(var i = 0; i < shopList.length; ++i){

      $(".nav").append("<div class='btn' id='btn" + i + "' data='"+i+"'>" + shopList[i].shopName + "</div>");

      $("#btn"+i).on("click", function () {

        var index = $(this).attr("data");
        $("#shopreport").hide();
        document.getElementById("shopreport").innerHTML = "";
        shopManager.generateShopReport(index);
        $("#shopreport").fadeIn("slow");

      }).on("mouseover", function(){
        $(this).css("background-color", "#FF9C6C");
      }).on("mouseout", function(){
        $(this).css("background-color", "#A4D997");
      });
    }
  }
    //document.getElementById('ID_OF_YOUR_ELEMENT').innerHTML += '<tr><td>' + string + '</td></tr>';

    //addDataById("report", reportText);

}

//Instatiate Shop Manager.
var shopManager = new ShopManager();
shopManager.addShop("Downtown", 8, 43, 4.5, numHours);
shopManager.addShop("Capitol Hill", 4, 37, 2, numHours);
shopManager.addShop("South Lake Union", 9, 23, 6.33, numHours);
shopManager.addShop("Wedgewood", 2, 28, 1.25, numHours);
shopManager.addShop("Ballard", 8, 58, 3.75, numHours);

shopManager.addImageToReport("http://www.shawnfiske.com/schoolImages/theDonut.jpg");

createUpdateForm();
createAddForm();

shopManager.generateReport();
shopManager.generateShopReport(0);
shopManager.createShopButtons();

function createUpdateForm(){

  $("#updateForm").append("<form id='update0'></form>");
  $("#update0").append("<div id='updateCustomer'></div>");
  $("#updateCustomer").append("<input type='text' name='updateMinCust' placeholder='Minimum Customers'/>");
  $("#updateCustomer").append("<input type='text' name='updateMaxCust' placeholder='Max Customers'/>");
  $("#update0").append("<div id='updateHours'></div>");
  $("#updateHours").append("<input type='text' name='updateDonutsHour' placeholder='Donuts Per Hour'/>");
  $("#updateHours").append("<input type='text' name='updateOperationHours' placeholder='Hour of Operation'/>");
  $("#update0").append("<button class='updateShopBtn'>Update Shop</button>");
};

function createAddForm(){
  $("#addForm").append("<form></form>");

  $("#addForm").append("<input type='text' name='addShopName' placeholder='Shop Name'/>");
  $("#addForm").append("<input type='text' name='addMinCust' placeholder='Minimum Customers'/>");
  $("#addForm").append("<input type='text' name='addMaxCust' placeholder='Minimum Customers'/>");
  $("#addForm").append("<input type='text' name='addDonutsHour' placeholder='Donuts Per Hour'/>");

  $("#addForm").append("<button class='addShopBtn'>Add Shop</button>");
};


$(".addShopBtn").on("click", function(e){
  e.preventDefault();
  var shopName = $("input[name=addShopName]").val();
  var minCust = $("input[name=addMinCust]").val();
  var maxCust = $("input[name=addMaxCust]").val();
  var donutsHour = $("input[name=addDonutsHour]").val();

  shopManager.addShop(shopName, minCust, maxCust, donutsHour, numHours);
  shopManager.generateReport();
  shopManager.generateShopReport(0);
  shopManager.createShopButtons();
});

$(".updateShopBtn").on("click", function(e){
  e.preventDefault();
  var index = $(this).attr("data");
  var minCust = $("input[name=updateMinCust]").val();
  var maxCust = $("input[name=updateMaxCust]").val();
  var donutsHour = $("input[name=updateDonutsHour]").val();
  var operationHour = $("input[name=updateOperationHours]").val();

  shopManager.updateShopByIndex(index, minCust, maxCust, donutsHour, operationHour);
  shopManager.generateReport();
  shopManager.generateShopReport(index);
  shopManager.createShopButtons();
});

function checkForEvenOdd(val){
  if(val % 2){
    return "even";
  }else{
    return "odd";
  }
};

function addDataById(id, data) {
  console.log(id +"\n"+ data);
  var elem = document.getElementById(id);
  elem.innerHTML = data;
};
