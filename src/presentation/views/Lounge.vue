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
                :src="'/assets/img/game/code/' + categorie?.logo"
                alt=""
                srcset=""
              />
              <span
                class="lounge__content__main_row__col_main__row__col__label_languaje"
                >Bienvenido al salon {{ categorie?.name ?? '' }}</span
              >
            </v-col>
            <v-col
              class="lounge__content__main_row__col_main__row__col point"
              cols="12"
              sm="3"
            >
              <img
                class="lounge__content__main_row__col_main__row__col__img"
                :src="'/assets/img/game/others/' + categorie?.code + '_platform.png'"
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
                >Puntaje {{categorie?.score}}%</strong
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
                >Avance {{categorie?.progress}}%</strong
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <br />
      <v-row no-gutters class="lounge__content__main_row">
        <v-col class="lounge__content__main_row__col_main">
          <v-card
            class="mx-auto lounge__content__main_row__col_main__card"
            max-width="600"
            ><template v-slot:title>
              <span class="lounge__content__main_row__col_main__card__title"
                >Nivel Basico</span
              >
            </template>
            <template v-slot:prepend>
              <v-avatar
                color="blue-darken-2"
                class="lounge__content__main_row__col_main__card__prepend"
              >
                <v-icon icon="mdi-alarm"></v-icon>
              </v-avatar>
            </template>
            <v-card-text
              class="lounge__content__main_row__col_main__card__text"
            >
              <v-row
                class="lounge__content__main_row__col_main__card__text__row"
              >
                <v-col
                  cols="3"
                  class="lounge__content__main_row__col_main__card__text__row__col"
                >
                  <div
                    size="80"
                    class="lounge__content__main_row__col_main__card__text__row__col__avatar"
                  >
                    <v-img
                      alt="John"
                      class="lounge__content__main_row__col_main__card__text__row__col__avatar__img"
                      src="/assets/img/game/others/money-java.png"
                    ></v-img>
                  </div>
                </v-col>
                <v-col
                  cols="9"
                  class="lounge__content__main_row__col_main__card__text__row__col"
                >
                  <v-row
                    no-gutters
                    class="lounge__content__main_row__col_main__card__text__row__col__row"
                  >
                    <v-col
                      cols="12"
                      class="lounge__content__main_row__col_main__card__text__row__col__row__col"
                    >
                      <span
                        class="lounge__content__main_row__col_main__card__text__row__col__row__col__result"
                        >Resultado <strong>0/5</strong></span
                      >
                    </v-col>
                  </v-row>
                  <v-row
                    no-gutters
                    class="lounge__content__main_row__col_main__card__text__row__col__row"
                  >
                    <v-col
                      cols="12"
                      class="lounge__content__main_row__col_main__card__text__row__col__row__col"
                    >
                      <span
                        class="lounge__content__main_row__col_main__card__text__row__col__row__col__point"
                        >Puntaje <strong>0%</strong></span
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="lounge__content__main_row__col_main">
          <v-card
            class="mx-auto lounge__content__main_row__col_main__card"
            max-width="600"
            ><template v-slot:title>
              <span class="lounge__content__main_row__col_main__card__title"
                >Nivel Basico</span
              >
            </template>
            <template v-slot:prepend>
              <v-avatar
                color="blue-darken-2"
                class="lounge__content__main_row__col_main__card__prepend"
              >
                <v-icon icon="mdi-alarm"></v-icon>
              </v-avatar>
            </template>
            <v-card-text
              class="lounge__content__main_row__col_main__card__text"
            >
              <v-row
                class="lounge__content__main_row__col_main__card__text__row"
              >
                <v-col
                  cols="3"
                  class="lounge__content__main_row__col_main__card__text__row__col"
                >
                  <div
                    size="80"
                    class="lounge__content__main_row__col_main__card__text__row__col__avatar"
                  >
                    <v-img
                      alt="John"
                      class="lounge__content__main_row__col_main__card__text__row__col__avatar__img"
                      src="/assets/img/game/others/money-java.png"
                    ></v-img>
                  </div>
                </v-col>
                <v-col
                  cols="9"
                  class="lounge__content__main_row__col_main__card__text__row__col"
                >
                  <v-row
                    no-gutters
                    class="lounge__content__main_row__col_main__card__text__row__col__row"
                  >
                    <v-col
                      cols="12"
                      class="lounge__content__main_row__col_main__card__text__row__col__row__col"
                    >
                      <span
                        class="lounge__content__main_row__col_main__card__text__row__col__row__col__result"
                        >Resultado <strong>0/5</strong></span
                      >
                    </v-col>
                  </v-row>
                  <v-row
                    no-gutters
                    class="lounge__content__main_row__col_main__card__text__row__col__row"
                  >
                    <v-col
                      cols="12"
                      class="lounge__content__main_row__col_main__card__text__row__col__row__col"
                    >
                      <span
                        class="lounge__content__main_row__col_main__card__text__row__col__row__col__point"
                        >Puntaje <strong>0%</strong></span
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup lang="ts">
import { AppModules, Ioc } from "@di/index";
import { Category, type CategoryRepository } from "@domain/index";
import { computed, onMounted, ref } from "vue";

import { useRoute } from 'vue-router';2

const route = useRoute();

const categorie = ref<Category>();
const categoryRepository = Ioc.instance.di.resolve<CategoryRepository>(
  AppModules.Category
);

onMounted(async () => {
  categorie.value = await categoryRepository.getCategory(
    route.query?.programingCode
  );
});

const scoreGlobal = computed(
  () =>
    categorie.value.reduce((accumulator, currentLevel) => {
      return accumulator + currentLevel.score;
    }, 0) / categorie.value.length
);

const progressGlobal = computed(
  () =>
    categorie.value.reduce((accumulator, currentLevel) => {
      return accumulator + currentLevel.progress;
    }, 0) / categorie.value.length
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
            &.point {
              display: flex;
              justify-content: flex-end;
            }
            &__img {
              margin-top: -10px;
              height: 70pt;
            }
            &__img_point {
              height: 75pt;
            }
            &__label_languaje {
              font-size: calc(var(--fontSize) + 15pt);
              text-align: center;
              padding-left: 10px;
            }
            &__point {
              font-size: calc(var(--fontSize) + 15pt);
            }
          }
        }
        &__card {
          max-width: 95% !important;
          &__title {
            font-size: calc(var(--fontSize) + 20pt) !important;
          }
          &__text {
            &__row {
              &__col {
                align-self: center;
                &__row {
                  &__col {
                    &__result {
                      font-size: calc(var(--fontSize) + 13pt);
                      text-align: center;
                      height: 20px;
                      strong {
                        text-align: right;
                        float: right;
                      }
                    }
                    &__point {
                      font-size: calc(var(--fontSize) + 13pt);
                      text-align: center;
                      height: 20px;
                      strong {
                        text-align: right;
                        float: right;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
