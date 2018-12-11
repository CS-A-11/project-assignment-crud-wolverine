var mongoose = require("mongoose");
var menu = mongoose.model("menu");
/* GET list of locations */

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };


module.exports.home = function(req, res) {
    res.render("orders-list" ,{
      pizza:[
        {
          name: "Pizzas",
          desc:"Exotic Combo of Cheese ",
          price: "Rs 300",
          pick:"Pick"
        },
        {
          //name: "Pizzas",
          desc:"Chicken Tikka",
          price:"Rs 400",
          pick:"Pick"
        }
      ],
        burger:[{
          //-name: "Burgers",
          desc:"Chicken Stripse",
          price:"Rs 450",
          pick:"Pick"
        },
        {
         //- name: "Burgers",
          desc:"Chicken Zinger",
          price:"Rs 500",
          pick:"Pick"
        }],
       dessert:[ {
          //- name: "Burgers",
           desc:"Apple Pie",
           price:"Rs 500",
           pick:"Pick"
         },
         {
          //- name: "Burgers",
           desc:"Black Forest",
           price:"Rs 500",
           pick:"Pick"
         }
      ]
    });
  };

  module.exports.menucreate = function(req, res) {
    res.render("orders-list");
    menu.find().exec(function(err, locations) {
      if (locations.length == 0) {
        // sendJSONresponse(res, 404, {
        //   message: "locations not found"
        // });
        // return;
        menu.create([
          {
            //name: "Pizzas",
            desc:"Exotic Combo of Cheese ",
            price: "Rs 300",
            pick:"Pick"
          },
          {
            //-name: "Pizzas",
            desc:"Chicken Tikka",
            price:"Rs 400",
            pick:"Pick"
          },
          {
           //- name: "Burgers",
            desc:"Chicken Stripse",
            price:"Rs 450",
            pick:"Pick"
          },
          {
           //- name: "Burgers",
            desc:"Chicken Zinger",
            price:"Rs 500",
            pick:"Pick"
          },
          {
            //- name: "Burgers",
             desc:"Apple Pie",
             price:"Rs 500",
             pick:"Pick"
           },
           {
            //- name: "Burgers",
             desc:"Black Forest",
             price:"Rs 500",
             pick:"Pick"
           }
          
        ],
          function(error, locs) {
            if (error) {
              sendJSONresponse(res, 400, err);
            } else {
              locations = locs;
              sendJSONresponse(res, 200, locations);
            }
          }
        );
      } else if (locations) sendJSONresponse(res, 200, locations);
      else if (err) {
        console.log(err);
        sendJSONresponse(res, 404, err);
        return;
      }
    });
  };