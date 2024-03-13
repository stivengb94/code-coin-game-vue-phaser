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
          <tr v-for="(item, index) in categories" :key="index">
            <td><img :src="'/assets/img/game/code/' + item.logo" height="130" alt="" srcset=""></td>
            <td>Aprender {{ item.name }}</td>
            <td><b>{{ item.score }}%</b></td>
            <td><b>{{ item.progress }}%</b></td>
          </tr>
        </tbody>
      </table>
      <div class="fotter">
        <v-row justify="center">
          <v-col class="btn-reiniciar" cols="12" md="4" sm="6">
            <v-btn color="indigo-darken-3" rounded="lg" block>Reiniciar</v-btn>
          </v-col>
          <v-col class="avance" cols="12" md="8" sm="6">
            <v-row justify="rigth">
              <v-col class="label" cols="12" md="10" sm="10">Puntaje global</v-col>
              <v-col class="label" cols="12" md="2" sm="2"><b>{{scoreGlobal}}%</b></v-col>
            </v-row>
            <v-row justify="rigth">
              <v-col class="label" cols="12" md="10" sm="10">Avance global</v-col>
              <v-col class="label" cols="12" md="2" sm="2"><b>{{progressGlobal}}%</b></v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppModules, Ioc } from '@di/index'
import { Category, type CategoryRepository } from '@domain/index';
import { computed, onMounted, ref } from 'vue';

const categories = ref<Category[]>([]);
const categoryRepository = Ioc.instance.di.resolve<CategoryRepository>(AppModules.Category)

onMounted(async () => {
  categories.value = await categoryRepository.list();
});

const scoreGlobal = computed(
  () =>  (categories.value.reduce((accumulator, currentLevel) => {
    return accumulator + currentLevel.score;
  }, 0)) / categories.value.length);

const progressGlobal = computed(
  () =>  (categories.value.reduce((accumulator, currentLevel) => {
    return accumulator + currentLevel.progress;
  }, 0)) / categories.value.length);

</script>


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
  --fontSize: 5pt;

  thead {
    text-align: center;
  }

  h1 {
    font-size: calc(var(--fontSize) + 20pt);
    text-align: center;
  }

  table {
    width: 100%;
    font-size: calc(var(--fontSize) + 10pt);

    td {
      text-align: center;
      min-width: 300px;

      img {
        width: 60%;
      }

      b {
        font-size: calc(var(--fontSize) + 15pt);
      }
    }
  }

  .fotter {
    .label {
      font-size: calc(var(--fontSize) + 10pt);
    }

    .avance {
      text-align: right;
    }

    .btn-reiniciar {
      display: flex;
      align-items: center;

      button {
        font-size: calc(var(--fontSize) + 10pt);

        .v-btn__content {
          font-size: calc(var(--fontSize) + 10pt);
        }
      }
    }
  }
}
</style>
