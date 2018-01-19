
  //Traer elementos del HTML
  var $nameInput = $("#name-input");
  var $phoneInput = $("#phone-input");

  var contacts = [];



  var loadPage = function () {
    $(".modal").modal();
    $nameInput.keyup(validateContact);
    $phoneInput.keyup(validateContact);
    $("#form").submit(addContact);
    //console.log($nameInput,$phoneInput);
    $("#searcher").keyup(filterContacts);
  };


  var validateContact = function () {
    //En esta funcion tenemos que validar que el usuario ingrese datos y no valores vacios
    //var $containerAddContact = $("#add-contact");

    if ($(this).val().trim().length > 0){
      $("#add-contact").removeAttr("disabled");
    } else {
      $("#add-contact").attr("disabled",true);
    }
  };

  var addContact = function (e) {
    e.preventDefault();
    //Las siguientes lineas toman el valor que el usuario agrega en los inputs y los guardan en variables
    var name = $nameInput.val();
    var phone = $phoneInput.val();

    //Con las variables separadas que obtuvimos creamos una estructura de datos unica, un objeto por cada contacto

    var newContact = {
      "name" : name,
      "phone" : phone
    };

    /*Agregamos el contacto a nuestra data (arreglo declarado) para poderla filtrar y eliminar posteriormente*/
    contacts.push(newContact);
    console.log(contacts);

    //La siguiente funcion se encarga de pintar los contactos en el html
    paintContactsInHTML(newContact);

     /*Limpiando valores de formulario*/
    $("form")[0].reset();
    $(".modal").modal("close");

  };

  var paintContactsInHTML = function(newContact) {

    /* Crear elementos con DOM html al publicar contacto */
    var $contactPaint = $("<article />" , {"class":"card-panel hoverable"});
    var $nameContact = $("<h4 />");
    var $deleteContactButton = $('<button type="button"/>');
    var $removeIcone = $("<i />" , {"class": 'material-icons'});
    var $phoneContact = $("<p />");



    //Asignando atributos y/o eventos
    $deleteContactButton.addClass("btn right");
    $removeIcone.text("delete");
    $deleteContactButton.click(removeContact);

    /*var $container = $(".container");
    $container.html()*/

    /* Asignando valores a los elementos*/
    $deleteContactButton.append($removeIcone);
    $nameContact.append(newContact.name);
    $phoneContact.append(newContact.phone);

    //Agregamos lo que creamos con el DOM a un elemento existente del HTML
    $contactPaint.append($nameContact);
    $contactPaint.append($deleteContactButton);
    $contactPaint.append($phoneContact);

    $("#publish-contacts").prepend($contactPaint);
  }




  var filterContacts = function() {
    //Esta funcion debe de filtrar la data segun el valor que el usuario ingrese en el input de busqueda
    var searchContact = $("#searcher").val().toLowerCase();
    if ($("#searcher").val().trim().length > 0) {
      var filtederedContacts = contacts.filter(function(newContact){
        return newContact.name.toLowerCase().indexOf(searchContact) >= 0;
      });
      $("#publish-contacts").empty();
      filtederedContacts.forEach(function(newContact){
        paintContactsInHTML(newContact);
      });
    } else {
      $("#publish-contacts").empty();
      contacts.forEach(function(newContact){
        paintContactsInHTML(newContact);
      });
    }

  };


  var removeContact = function () {
    //esta funcion como primer alcance debe de poer borrar la tarjeta que se crea desde el DOM
    //como segundo alcance borrar el elemento de la data
  };




  $(document).ready(loadPage);
