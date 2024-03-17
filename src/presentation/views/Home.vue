<template>
  <div class="home">
    <div>
      <h1>Bienvenidos a CodeGame</h1>
      <table>
        <thead>
          <th></th>
          <th></th>
          <th>Puntaje</th>
          <th>Avance</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in categories" :key="index" @click="navigateLevel(item)">
            <td><img :src="'/assets/img/game/code/' + item.logo" alt="" srcset=""></td>
            <td>Aprender {{ item.name }}</td>
            <td><b>{{ item.score }}%</b></td>
            <td><b>{{ item.progress }}%</b></td>
          </tr>
        </tbody>
      </table>
      <div class="footer">
        <v-row justify="center">
          <v-col class="btn-reiniciar" cols="12" md="4" sm="6">
            <v-btn @click="restart" color="indigo-darken-3" rounded="lg" block>Reiniciar</v-btn>
          </v-col>
          <v-col class="avance" cols="12" md="8" sm="6">
            <v-row justify="right">
              <v-col class="label" cols="12" md="10" sm="10">Puntaje global <b>{{scoreGlobal}}%</b></v-col>
            </v-row>
            <v-row justify="right">
              <v-col class="label" cols="12" md="10" sm="10">Avance global <b>{{progressGlobal}}%</b> </v-col>
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
import { LOUNGE } from '@presentation/routes/routes-paths';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const categories = ref<Category[]>([]);
const categoryRepository = Ioc.instance.di.resolve<CategoryRepository>(AppModules.Category)
const router = useRouter();

onMounted(async () => {
  categories.value = await categoryRepository.list();
});

  const scoreGlobal = computed(
  () => {
   const result = (categories.value.reduce((accumulator, currentLevel) => {
    return accumulator + currentLevel.score;
  }, 0)) / categories.value.length
  return parseFloat(result.toFixed(1))
  });

const progressGlobal = computed(
  () => {
   const result =  (categories.value.reduce((accumulator, currentLevel) => {
    return accumulator + currentLevel.progress;
   }, 0)) / categories.value.length
  return parseFloat(result.toFixed(1))
  });

const navigateLevel = async (category: Category ) => {
  router.push({
        path: LOUNGE,
        query: { categoryCode: category.code }
    });
}

const restart = async ()  => {
  await categoryRepository.restart()
  categories.value = await categoryRepository.list();
}

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

  h1 {
    font-size: calc(var(--fontSize) + 20pt);
    text-align: center;
  }

  table {
    width: 100%;
    font-size: calc(var(--fontSize) + 10pt);

    th, td {
      text-align: center;
      min-width: 300px;

      img {
        height: 70pt;
      }

      b {
        font-size: calc(var(--fontSize) + 15pt);
      }
    }
    tr:hover {
      background-color: #bbb9b963;
    }
    tr {
      cursor: pointer;
    }
  }

  .footer {
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
@media (max-width: 1220px) {
  .home {
    
    table {
      th, td {
        min-width: 200px;
      }
    }
  }
}

@media (max-width: 824px) {
  .home {
    
    table {
      th, td {
        min-width: 140px;
      }
    }
  }
}

@media (max-width: 600px) {
  .home {
    flex-direction: column;
    padding: 10px;

    h1 {
      font-size: calc(var(--fontSize) + 10pt);
    }

    table {
      th, td {
        font-size: 15px;
        min-width: auto;
        img {
          height: 50pt;
        }
      }
    }

    .footer {
      .avance {
        text-align: center;
        margin-top: 20px;
      }
    }
  }
}
</style>