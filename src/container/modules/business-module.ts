import "reflect-metadata";
import { ContainerModule, interfaces } from "inversify";
import { TYPES, TARGETS } from "../types";

import { Repository } from "../../database/repositories/_repository";
import { Controller } from "../../database/controllers/_entity-controller";

const businessModule = new ContainerModule((bind: interfaces.Bind) => {});

export default businessModule;
