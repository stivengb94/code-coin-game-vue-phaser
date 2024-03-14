<template>
  <div class="lounge">
    <v-container class="bg-white lounge__content">
      <v-row no-gutters class="lounge__content__main_row">
        <v-col cols="12" sm="10" class="lounge__content__main_row__col_main">
          <v-row no-gutters class="lounge__content__main_row__col_main__row">
            <v-col
              class="lounge__content__main_row__col_main__row__col"
              cols="12"
              sm="9"
            >
              <img
                class="lounge__content__main_row__col_main__row__col__img"
                src="/assets/img/game/code/java.png"
                alt=""
                srcset=""
              />
              <span
                class="lounge__content__main_row__col_main__row__col__label_languaje"
                >Bienvenido al salon Java</span
              >
            </v-col>
            <v-col
              class="lounge__content__main_row__col_main__row__col"
              cols="12"
              sm="3"
            >
              <img
                class="lounge__content__main_row__col_main__row__col__img"
                src="/assets/img/game/others/java_platform.png"
                alt=""
                srcset=""
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="2" class="lounge__content__main_row__col_main">
          <v-row no-gutters class="lounge__content__main_row__col_main__row">
            <v-col
              class="lounge__content__main_row__col_main__row__col"
              cols="12"
              sm="12"
            >
              <strong
                class="lounge__content__main_row__col_main__row__col__point"
                >Puntaje 0%</strong
              >
            </v-col>
          </v-row>
          <v-row no-gutters class="lounge__content__main_row__col_main__row">
            <v-col
              class="lounge__content__main_row__col_main__row__col"
              cols="12"
              sm="12"
            >
              <strong
                class="lounge__content__main_row__col_main__row__col__point"
                >Avance 0%</strong
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup lang="ts">
import { AppModules, Ioc } from "@di/index";
import { Category, type CategoryRepository } from "@domain/index";
import { computed, onMounted, ref } from "vue";

const categories = ref<Category[]>([]);
const categoryRepository = Ioc.instance.di.resolve<CategoryRepository>(
  AppModules.Category
);

onMounted(async () => {
  categories.value = await categoryRepository.list();
});

const scoreGlobal = computed(
  () =>
    categories.value.reduce((accumulator, currentLevel) => {
      return accumulator + currentLevel.score;
    }, 0) / categories.value.length
);

const progressGlobal = computed(
  () =>
    categories.value.reduce((accumulator, currentLevel) => {
      return accumulator + currentLevel.progress;
    }, 0) / categories.value.length
);
</script>


<style lang="scss" scoped>
.lounge {
  background-color: white !important;
  color: black;
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  --fontSize: 5pt;

  &__content {
    max-width: 80%;
    &__main_row {
      &__col_main {
        &__row {
          &__col {
            display: flex;
            align-items: center;
            justify-content: center;
            &__img {
              height: 70pt;
            }
            &__label_languaje {
              font-size: calc(var(--fontSize) + 10pt);
              text-align: center;
              padding-left: 10px;
            }
            &__point {
                font-size: calc(var(--fontSize) + 15pt);
            }
          }
        }
      }
    }
  }
}
</style>