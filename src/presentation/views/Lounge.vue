<template>
  <div class="lounge ">
    <v-container class="bg-white lounge__content overflow-auto mt-12">
      <v-row justify="start" no-gutters class="lounge__content__main_row">
        <v-col class="lounge__content__main_row__col_main__row__col" cols="12" sm="12"  lg="2">
              <v-btn @click="onBack" color="indigo-darken-3" rounded="lg" block prepend-icon="mdi-arrow-left">
                <template v-slot:prepend>
                  <v-icon color="white"></v-icon>
                </template>
                Volver
              </v-btn>
            </v-col>
      </v-row>
      <v-row no-gutters class="lounge__content__main_row">
        <v-col cols="12" sm="12" lg="8" class="lounge__content__main_row__col_main">
          <v-row no-gutters class="lounge__content__main_row__col_main__row">
            <v-col class="lounge__content__main_row__col_main__row__col mt-6" cols="12" sm="12" lg="12">
              <img class="lounge__content__main_row__col_main__row__col__img"
                :src="'/assets/img/game/code/' + ratingCategory?.categoryLogo" alt="" srcset="" />
              <span class="lounge__content__main_row__col_main__row__col__label_languaje">Bienvenido al salon {{
                ratingCategory?.categoryName ?? '' }}</span>
            </v-col>
          </v-row>
          
        </v-col>
        <v-col cols="12" sm="12" lg="4" >
          <v-list>
            <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="lounge__list-item-title">Puntaje <strong>{{ ratingCategory?.score }}%</strong></v-list-item-title>
              <v-list-item-subtitle class="lounge__list-item-title">Avance <strong>{{ ratingCategory?.progress }}%</strong></v-list-item-subtitle>
            </v-list-item-content>
              <template v-slot:prepend>
                <img v-if="ratingCategory" class="lounge__content__main_row__col_main__row__col__img"
              :src="'/assets/img/game/others/' + ratingCategory?.categoryLevelLogo" alt="" srcset="" />
              </template>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <br />
      <v-row no-gutters class="lounge__content__main_row">
        <v-col v-for="(item, index) in levelsCategory" :key="index" class="lounge__content__main_row__col_main mt-4"  cols="12" sm="12"  lg="6">
          <v-card @click="navigateGame(item)"
            :class="'mx-auto lounge__content__main_row__col_main__card ' + bgCardLevel(item)" max-width="600"><template
              v-slot:title>
              <span class="lounge__content__main_row__col_main__card__title">Nivel {{ item.name }}</span>
            </template>
            <template v-slot:prepend>
              <v-avatar color="blue-darken-2" class="lounge__content__main_row__col_main__card__prepend">
                <v-icon icon="mdi-alarm"></v-icon>
              </v-avatar>
            </template>
            <v-card-text class="lounge__content__main_row__col_main__card__text">
              <v-row class="lounge__content__main_row__col_main__card__text__row">
                <v-col cols="3" class="lounge__content__main_row__col_main__card__text__row__col">
                  <div size="80" class="lounge__content__main_row__col_main__card__text__row__col__avatar">
                    <v-img alt="John" class="lounge__content__main_row__col_main__card__text__row__col__avatar__img"
                      :src="'/assets/img/game/others/' + item.logo"></v-img>
                  </div>
                </v-col>
                <v-col cols="9" class="lounge__content__main_row__col_main__card__text__row__col">
                  <v-row no-gutters class="lounge__content__main_row__col_main__card__text__row__col__row">
                    <v-col cols="12" class="lounge__content__main_row__col_main__card__text__row__col__row__col">
                      <span
                        class="lounge__content__main_row__col_main__card__text__row__col__row__col__result">Resultado
                        <strong>{{ item.totalCorrectQuestions }}/{{ item.totalQuestions }}</strong></span>
                    </v-col>
                  </v-row>
                  <v-row no-gutters class="lounge__content__main_row__col_main__card__text__row__col__row">
                    <v-col cols="12" class="lounge__content__main_row__col_main__card__text__row__col__row__col">
                      <span class="lounge__content__main_row__col_main__card__text__row__col__row__col__point">Puntaje
                        <strong>{{ item.score }}%</strong></span>
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
import type { RatingCategory } from "@domain/category/rating-category";
import { CategoryCode, CategoryLevel, type CategoryLevelRepository, type CategoryRepository } from "@domain/index";
import { GAME, LOUNGE } from "@presentation/routes/routes-paths";
import { computed, onMounted, ref } from "vue";

import { useRoute } from 'vue-router'; 2
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const levelsCategory = ref<CategoryLevel[]>();
const ratingCategory = ref<RatingCategory>();

const categoryRepository = Ioc.instance.di.resolve<CategoryRepository>(
  AppModules.Category
);
const categoryLevelRepository = Ioc.instance.di.resolve<CategoryLevelRepository>(
  AppModules.CategoryLevel
);

onMounted(async () => {
  const categoryCode = route.query?.categoryCode as CategoryCode
  ratingCategory.value = await categoryRepository.rating(
    categoryCode
  );
  levelsCategory.value = await categoryLevelRepository.listBy(
    categoryCode
  );
});

const navigateGame = async (level: CategoryLevel) => {
  router.push({
    path: GAME,
    query: { levelName: level.name, levelCode: level.code, categoryCode: level.categoryCode, categoryName: ratingCategory.value?.categoryName }
  });
}

const onBack = async () => {
  router.back()
}

const bgCardLevel = (level: CategoryLevel) => {
  if (level.totalQuestions <= 0) return ''
  const score = level.score
  if (score < 40) {
    return 'lounge__content__main_row__col_main__card__bg_bad_rating';
  } else if (score >= 40 && score <= 70) {
    return 'lounge__content__main_row__col_main__card__bg_regular_rating';
  } else {
    return 'lounge__content__main_row__col_main__card__bg_good_rating';
  }
}

</script>

<style lang="scss" scoped>



.lounge {
  background-color: white !important;
  color: black;
  width: 100%;
  height: 100%;
  --fontSize: 5pt;

  &__list-item-title {
    font-size: calc(var(--fontSize) + 12pt) !important;
    line-height: 2.0rem;
  }

  &__content {
    max-width: 80%;
    overflow: auto; 
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
          cursor: pointer;

          &__title {
            font-size: calc(var(--fontSize) + 20pt) !important;
          }

          &__bg_bad_rating {
            background-color: rgba(198, 10, 10, 0.5);
          }

          &__bg_regular_rating {
            background-color: rgba(237, 237, 3, 0.674);
          }

          &__bg_good_rating {
            background-color: rgba(0, 222, 89, 0.634);
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
