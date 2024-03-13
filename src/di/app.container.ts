import { CategoryLevelRepositoryImpl, CategoryRepositoryImpl, LearningRepositoryImpl, QuizzRepositoryImpl } from "@infraestructure/index";
import { AppModules, Container } from ".";

export class Ioc {
    private static _instancia: Ioc;
    di = new Container();
    private constructor() {
        this.ini()
     }
    
     static get instance(): Ioc {
      if (!Ioc._instancia) {
        Ioc._instancia = new Ioc();
      }
      return Ioc._instancia;
    }

    ini() {
        this.di.register(AppModules.Category, new CategoryRepositoryImpl());
        this.di.register(AppModules.Quizz, new QuizzRepositoryImpl());
        this.di.register(AppModules.Learning, new LearningRepositoryImpl());
        this.di.register(AppModules.CategoryLevel, new CategoryLevelRepositoryImpl());
    }
  }