import { IPusherEventType } from "@internal/shared";

export const mapKeyValueEvent = (ids: string[] = [], event: IPusherEventType) => {
  return ids.reduce((acc, id) => {
    return {
      ...acc,
      [id]: event,
    }
  }, {});
}
