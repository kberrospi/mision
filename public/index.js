

$(document).ready(function() {
  $('form').on('submit', function(e){
    e.preventDefault();
    let name=""; let email=""; let passw ="";
    name = $('#user').val(); email = $('#correo').val(); passw = $('#passcode').val();

    $.ajax({
      method: "POST",
      url: "/",
      data: JSON.stringify({ userName: name, correo: email, pass: passw }),
      contentType: "application/json; charset=utf-8", //"application/json"
      dataType: "json",
    }).done(function(data){
      let html = "";
      data.forEach(element => {
        html += `<tr><td>${element.userName}</th><td>${element.correo}</th><td>${element.pass}</th></td>`;
      });
      $('#usuarios').append(html + "</tbody></table>");
      $('.wrapper').append('<a href="http://localhost:3000/">Volver </a>');
    });

    $('form').hide();
    $('h1').replaceWith('<h1 class="text-center">Usuarios registrados</h1>')
    $('#tabla').append('<table class="table table-bordered text-center" id="usuarios"><thead><tr><th>Nombre</th><th>Email</th><th>Contraseña</th></tr></thead><tbody>');

  });
});
