import { IService } from "../app/service";

export interface Helper {
  service: {
    get: () => IService
  }
}
