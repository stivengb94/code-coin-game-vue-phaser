import { CategoryRepositoryImpl, LearningLevelRepositoryImpl } from "@infraestructure/index";
import { AppModules, Container } from ".";

const di = new Container();

di.register(AppModules.Category, new CategoryRepositoryImpl());
di.register(AppModules.Category, new LearningLevelRepositoryImpl());