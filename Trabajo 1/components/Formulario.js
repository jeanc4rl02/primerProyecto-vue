Vue.component("formulario-registro", {
  template: `<div class="abs-center">
                    <form>
                  <div class="card">
                    <div class="col-11" >
                      <label class="form-label">Nombres:</label> <br>
                      <input type="text" v-model = "nuevoNombre" class="form-control"><br>
                    </div>
                    <div class="col-11">
                      <label class="form-label">Apellidos:</label><br>
                      <input type= "text" v-model = "nuevoApellido" class="form-control"><br>
                    </div>
                    <div class="col-11">
                      <label class="form-label">Usuario:</label> <br>
                      <input type="text" v-model = "nuevoUsuario" class="form-control"><br>
                    </div>
                    <div class="col-11">
                      <label class="form-label">Fecha de nacimiento:</label> <br>
                      <input type="date" v-model = "nuevaFecha" class="form-control"><br>
                    </div>
                        <ul>
                          <li v-if="error == true">El usuario ya se encuentra registrado.</li>
                        </ul>
                    <div class="col-auto">
                        <input value="Guardar "type="submit" @click.prevent="enviarForm" class="btn btn-primary col-11">
                    </div>
  </div>`,
  data() {
    return {
      usuarios: [],
      nuevoNombre: "",
      nuevoApellido: "",
      nuevoUsuario: "",
      nuevaFecha: "",
      edad: 0,
      clave: "",
      error: false,
    };
  },
  methods: {
    calcularEdad(fecha) {
      let hoy = new Date();
      let nacimiento = new Date(fecha);
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      let mes = hoy.getMonth() - nacimiento.getMonth();

      if (mes < 0 || (mes == 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
      }
      this.edad = edad;
    },

    generarClave() {
      let clave = "";
      let letras = "a b c d e f g h i j k l m n o p q r s t u v w x y z".split(
        " "
      );
      for (let i = 1; i <= 4; i++) {
        if (letras[i]) {
          const al = Math.floor(Math.random());
          const al1 = Math.floor(Math.random() * letras.length);
          const al2 = Math.floor(Math.random() * letras.length + 3);
          if (al == 1) {
            clave += letras[al1];
          } else if (al == 2) {
            clave += letras[al2] + letras[al1];
          } else {
            clave += letras[al1].toUpperCase();
          }
        }
        const num = Math.floor(Math.random() * 10);
        clave += num;
      }
      this.clave = clave;
    },

    enviarForm(e) {
      const validacion = this.usuarios.find(
        (user) => user.usuario == this.nuevoUsuario
      );
      if (validacion) {
        this.error = true;
      } else {
        this.error = false;
        this.generarClave();
        this.calcularEdad(this.nuevaFecha);
        this.usuarios.push({
          nombres: this.nuevoNombre,
          apellidos: this.nuevoApellido,
          nombreCompleto: this.nuevoNombre + " " + this.nuevoApellido,
          usuario: this.nuevoUsuario,
          edad: this.edad,
          clave: this.clave,
        });
      }
      console.log(this.usuarios);
    },
  },
});
