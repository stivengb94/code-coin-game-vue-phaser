<template>
  <div class="home">
    <div>
      <h1>Bienveidos a CodeGame</h1>
      <table>
        <thead>
          <th></th>
          <th></th>
          <th>Puntaje</th>
          <th>Avance</th>
        </thead>
        <tbody>
          <tr>
            <td><img src="../assets/img/java.png" alt="" srcset=""></td>
            <td>Aprender Java</td>
            <td><b>0%</b></td>
            <td><b>0%</b></td>
          </tr>
          <tr>
            <td><img src="../assets/img/python.png" alt="" srcset=""></td>
            <td>Aprender Python</td>
            <td><b>0%</b></td>
            <td><b>0%</b></td>
          </tr>
          <tr>
            <td><img src="../assets/img/sql.png" alt="" srcset=""></td>
            <td>Aprender SQL</td>
            <td><b>0%</b></td>
            <td><b>0%</b></td>
          </tr>
        </tbody>
      </table>
      <div class="fotter">
        <v-row justify="center">
          <v-col class="btn-reiniciar" cols="12" md="4" sm="6">
            <v-btn color="indigo-darken-3" size="x-large" rounded="lg" block>Reiniciar</v-btn>
          </v-col>
          <v-col class="avance" cols="12" md="8" sm="6">
            <v-row justify="rigth">
              <v-col class="label" cols="12" md="10" sm="10">Puntaje global</v-col>
              <v-col class="label" cols="12" md="2" sm="2"><b>0%</b></v-col>
            </v-row>
            <v-row justify="rigth">
              <v-col class="label" cols="12" md="10" sm="10">Avance global</v-col>
              <v-col class="label" cols="12" md="2" sm="2"><b>0%</b></v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  background-color: white !important;
  color: black;
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;

  thead {
    text-align: center;
  }

  h1 {
    font-size: 50px;
    text-align: center;
  }

  table {
    width: 100%;
    font-size: 30px;

    td {
      text-align: center;
      min-width: 300px;

      img {
        width: 300px;
      }

      b {
        font-size: 40px;
      }
    }
  }

  .fotter {
    .label {
      font-size: 30px;
    }

    .avance {
      text-align: right;
    }

    .btn-reiniciar {
      display: flex;
      align-items: center;

      button {
        font-size: 30px;
        .v-btn__content {
          font-size: 30px;
        }
      }
    }
  }
}
</style>