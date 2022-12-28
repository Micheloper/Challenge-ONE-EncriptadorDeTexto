class Logica {
  constructor(btnIdDecrypt, btnIdEncrypt, btnIdCopy) {
    this.idDecrypt = btnIdDecrypt;
    this.idEncrypt = btnIdEncrypt;
    this.idCopy = btnIdCopy;
  }
  static valorE = /a|e|i|o|u/gi;
  static objSustituirE = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat",
  };
  static valorD = /ai|enter|imes|ober|ufat/gi;
  static objSustituirD = {
    ai: "a",
    enter: "e",
    imes: "i",
    ober: "o",
    ufat: "u",
  };
  Logica(valor, objSustituir) {
    let texto = document.getElementById("txtInicio").value;
    let final = document.getElementById("txtFinal");
    if (Validacion(texto)) {
      texto = texto.replace(valor, (igual) => objSustituir[igual]);
      final.innerHTML = texto;
      document.getElementById("txtInicio").value = " ";
    } else {
      Swal.fire("Solo letras minúsculas y sin acentos");
      document.getElementById("txtInicio").value = " ";
      setInterval(() => {
        window.location.reload();
      }, 1000);
    }
    function Validacion(texto) {
      let regex = /[A-ZÀ-ú]/;
      return !regex.test(texto) && texto != "";
    }
  }
  Validacion(frase) {
    let regex = /[A-ZÀ-ú]/;
    return !regex.test(frase) && frase != "";
  }
  Copiar() {
    let codigoACopiar = document.getElementById("txtFinal");
    let copiado = navigator.clipboard.writeText(codigoACopiar.innerHTML);
    return copiado;
  }
  Ocutar() {
    document.getElementById("ocutar").classList.remove("ocutarCss");
    document.getElementById("ocutarImg").classList.add("ocutarImg");
    document.getElementById("main2").classList.add("mainDespues");
  }
  init() {
    let encriptar = this.Logica;
    let desencriptar = this.Logica;
    let ocutar = this.Ocutar;
    let copiar = this.Copiar;

    document.addEventListener("keypress", (e) => {
      if (e.key === "E") {
        e.preventDefault();
        this.idEncrypt.click();
      }
      if (e.key === "D") {
        e.preventDefault();
        this.idDecrypt.click();
      }
      if (e.key === "C") {
        e.preventDefault();
        this.idCopy.click();
      }
    });

    this.idDecrypt.addEventListener("click", ChangeFunction);
    this.idEncrypt.addEventListener("click", ChangeFunction);
    this.idCopy.addEventListener("click", copiar);
    function ChangeFunction(event) {
      if (event.target.id === "encriptar") {
        encriptar(Logica.valorE, Logica.objSustituirE);
        ocutar();
      } else if (event.target.id === "desencriptar") {
        desencriptar(Logica.valorD, Logica.objSustituirD);
        ocutar();
      }
    }
  }
}
let init = new Logica(desencriptar, encriptar, copiar);
init.init();
