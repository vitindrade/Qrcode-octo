window.onload = function () {
};  
function selssid(value) {
  $("ssid").value = value;
}
function ver(password) {
  var tipo = $(password).type;
  if (tipo == "password") {
    $(password).type = "text";
  } else {
    $(password).type = "password";
  }
}

function check_dhcp(hab, id1, id2, id3, id4) {
    $(id1).disabled = hab.checked;
    $(id2).disabled = hab.checked;
    $(id3).disabled = hab.checked;
    $(id4).disabled = hab.checked;
};

function Type_rede() {
    if ($("eth").checked) {
        $('ssid_label').setAttribute('hidden', 'true');
        $('ssid_label').setAttribute('disable', 'true');
        $('pass_label').setAttribute('hidden', 'true');
        $('pass_label').setAttribute('disable', 'true');
        $('text').setAttribute('rowspan', '7');
    }else if ($("wifi").checked) {
        $('ssid_label').removeAttribute('hidden');
        $('ssid_label').setAttribute('disable', 'false');
        $('pass_label').removeAttribute('hidden');
        $('pass_label').setAttribute('disable', 'true');
        $('text').setAttribute('rowspan', '9');
    }
}

function Type_modulo() {
  if ($("slave").checked) {
      $('ssid_label').setAttribute('hidden', 'true');
      $('ssid_label').setAttribute('disable', 'true');
      $('pass_label').setAttribute('hidden', 'true');
      $('pass_label').setAttribute('disable', 'true');
      $('text_label').setAttribute('hidden', 'true');
      $('rede_label').setAttribute('hidden', 'true');
      $('rede_label').setAttribute('disable', 'true');
      $('ip_label').setAttribute('hidden', 'true');
      $('ip_label').setAttribute('disable', 'true');
      $('dns_label').setAttribute('hidden', 'true');
      $('dns_label').setAttribute('disable', 'true');
      $('class_label').setAttribute('hidden', 'true');
      $('class_label').setAttribute('disable', 'true');
      $('gtw_label').setAttribute('hidden', 'true');
      $('gtw_label').setAttribute('disable', 'true');
      $('dhcp_label').setAttribute('hidden', 'true');
      $('dhcp_label').setAttribute('disable', 'true');
      $('dhcp').checked = true;
  }else if ($("master").checked) {
      $('ssid_label').removeAttribute('hidden');
      $('ssid_label').setAttribute('disable', 'false');
      $('pass_label').removeAttribute('hidden');
      $('pass_label').setAttribute('disable', 'false');
      $('text_label').removeAttribute('hidden');
      $('rede_label').removeAttribute('hidden');
      $('rede_label').setAttribute('disable', 'false');
      $('ip_label').removeAttribute('hidden');
      $('ip_label').setAttribute('disable', 'false');
      $('dns_label').removeAttribute('hidden');
      $('dns_label').setAttribute('disable', 'false');
      $('class_label').removeAttribute('hidden');
      $('class_label').setAttribute('disable', 'false');
      $('gtw_label').removeAttribute('hidden');
      $('gtw_label').setAttribute('disable', 'false');
      $('dhcp_label').removeAttribute('hidden');
      $('dhcp_label').setAttribute('disable', 'false');
      check_dhcp(this,'ip','nm','gw','dns');
      $('text').setAttribute('rowspan', '9');
      $('wifi').checked = true;
      $('dhcp').checked = false;
  }
}

function save() {
  if (!validaAdmin()) {
    return false;
  }
  if ($("wifi").checked) {
    if (!validaChannel()) {
      return false;
    }
  }
  if (!$("dhcp").checked) {        // checkbox "Habilitar DHCP" estiver marcado
    if (!validaDHCP()) {
      return false;
    }
  }
  $("message").innerText = "";
}

function $(id) {
  return document.getElementById(id);
};
function validaAdmin() {
  if (!validaNull($("login").value)) {
    $("login").focus();
    return false;
  }
  if (!validaNull($("pass").value)) {
    $("pass").focus();
    return false;
  }
  if (!validaNull($("name").value)) {
    $("name").focus();
    return false;
  }
  return true;
};


function validaChannel() {
  if (!validaNull($("ssid").value)) {
    $("ssid").focus();
    return false;
  }
  if (!validaNull($("password").value)) {
    $("password").focus();
    return false;
  }
  return true;
};

function validaDHCP() {
  if (!validaIP($("ip").value) || !validaNull($("ip").value)) {
    $("ip").focus();
    return false;
  }
  if (!validaClass($("nm").value) || !validaNull($("nm").value)) {
    $("nm").focus();
    return false;
  }
  if (!validaIP($("gw").value) || !validaNull($("gw").value)) {
    $("gw").focus();
    return false;
  }
  if (!validaIP($("dns").value) || !validaNull($("dns").value)) {
    $("dns").focus();
    return false;
  }
  if (!($("mac").disabled)) { // Verifica se o campo MAC não está desabilitado
    if (!validaMAC($("mac").value) || !validaNull($("mac").value)) {
      $("mac").focus();
      return false;
    }
  }
  return true;
}


  function validaIP(varios) {
    var ipRegex = /^((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/; // validar endereço IP
    var ipLoopBack = /^(127)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/; // validar endereço IP de LoopBack (127.0.0.0 a 127.255.255.255)
    var ipMultiCast = /^(22[4-9]|23\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/; // validar endereço IP de MultiCast (224.0.0.0 a 239.255.255.255)
    var iperr = /^((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(255)$/;
    var iperror = /^((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(0)$/;
    if (!ipRegex.test(varios)) {
      $("message").innerText = "IP inserido inválido! ";
      return false;
    }
    if (varios === "0.0.0.0") {
      $("message").innerText = "O endereço IP 0.0.0.0 não é permitido.";
      return false;
    }
    // validar endereço IP Faixa A
    if (iperror.test(varios)) {
      $("message").innerText = "O endereço IP não é permitido, pois é o endereço de rede";
      return false;
    }
    if (iperr.test(varios)) {
      $("message").innerText = "O endereço IP não é permitido, pois é o endereço de Broadcast";
      return false;
    }
    // validar endereço IP LoopBack
    if (ipLoopBack.test(varios)) {
      $("message").innerText = "IP inserido inválido! Usado para comunicação LoopBack(127.0.0.0 a 127.255.255.255)";
      return false;
    }
    // validar endereço IP MultiCast
    if (ipMultiCast.test(varios)) {
      $("message").innerText = "IP inserido inválido! Usado para comunicação de grupo MultiCast(224.0.0.0 a 239.255.255.255)";
      return false;
    }
    return true;
  };
  function validaClass(classes) {
    var ipRegex = /^((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/; // validar endereço IP
    if (!ipRegex.test(classes)) {
      $("message").innerText = "Classe inserida inválida! ";
      return false;
    }
    return true;
  };
  function validaMAC(mac) {
    var macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/; // validar MAC address
    if (!macRegex.test(mac)) {
      $("message").innerText = "MAC inserido inválido! ";
      return false;
    }
    return true;
  };

  function validaNum(num) {
    const numRegex = /^[0-9]+$/;
    if (!numRegex.test(num)) {
      $("message").innerText = "Número inserido inválido!";
      return false;
    }
    return true;
  };

  function validaNTP(ntp) {
    var FQDNRegex = /^[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+$/;
    var NTPRegex = /\d/; // validar números de até 4 digitos .com .com.br
    if (FQDNRegex.test(ntp)) {
      return true;
    }
    else if (NTPRegex.test(ntp)) {
      if (validaIP(ntp)) {
        return true;
      } else {
        return false;
      }
    } else {
      $("message").innerText = "Domínio/IP inserido inválido!";
      return false;
    }
  };

  function validaNull(value) {
    if (value === "") {
      $("message").innerText = "Campos obrigatórios não preenchidos.";
      return false;
    }
    return true;
  }
  