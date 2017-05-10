function checkfields_register() {
  if (document.getElementById("emailregister").value == null || document.getElementById("emailregister").value.length == 0) {
    alert("[ERROR] Email field empty, try again");
    return false;

  } else if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(document.getElementById("emailregister").value))) {
    alert("[ERROR] The email address is incorrect");
    return false;
  
  } else if (document.getElementById("passwordregister").value == null || document.getElementById("passwordregister").value.length == 0) {
    alert("[ERROR] Password field empty, try again");
    return false;
  }
  
  return true;
}

function checkfields_login() {
  if (document.getElementById("emaillogin").value == null || document.getElementById("emaillogin").value.length == 0) {
    alert("[ERROR] Email field empty, try again");
    return false;

  } else if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(document.getElementById("emaillogin").value))) {
    alert("[ERROR] The email address is incorrect");
    return false;
  
  } else if (document.getElementById("username").value == null || document.getElementById("username").value.length == 0) {
    alert("[ERROR] Username field empty, try again");
    return false;
  
  } else if (document.getElementById("passwordlogin").value == null || document.getElementById("passwordlogin").value.length == 0) {
    alert("[ERROR] Password field empty, try again");
    return false;
  }
  
  return true;
}