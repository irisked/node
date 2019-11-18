import { ROLE } from "../models/roles";
import { QueryOption, Query } from "../database/controllers/queries";

export class ServiceOptions {
  static withRole(role: ROLE): QueryOption {
    return (query: Query) => {
      switch (role) {
        case ROLE.ADMINISTRATOR:
          query.isDeleted();
          break;
        case ROLE.USER:
          query.isDeleted(false);
          break;
        case ROLE.UNAUTHORIZED:
          query.isDeleted(false);
          break;
        default:
          query.isDeleted(false);
          break;
      }
    };
  }
}
