import "reflect-metadata";
import { Container } from "inversify";
import applicationModule from "./modules/application-module";
import businessModule from "./modules/business-module";

const container = new Container();

container.load(applicationModule);
container.load(businessModule);

export default container;
