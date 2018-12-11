$(document).ready(function() {
    alert("we");
    $("#search").on("keyup", function(e) {
      if (e.keyCode === 13) {
        var parameters = { search: $(this).val() };
        $.get("/rest", parameters, function(data) {
          $("#results").html(data);
        });
      }
    });
  });