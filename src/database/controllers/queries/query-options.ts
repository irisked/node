import { ROLE } from "../../../models/roles";
import { Query, QueryOption } from ".";

export class QueryOptions {
  static withRole(role: ROLE): QueryOption {
    return (query: Query) => {
      switch (role) {
        case ROLE.ADMINISTRATOR:
          query.includeDeleted(true);
          break;
        case ROLE.USER:
          query.includeDeleted(false);
          break;
        case ROLE.UNAUTHORIZED:
          query.includeDeleted(false);
          break;
        default:
          query.includeDeleted(false);
          break;
      }
    };
  }
}
