import { Model } from "pinia-orm";
import { Num } from "pinia-orm/decorators";

export default class Country extends Model {
  static entity = "countries";

  @Num() declare id: number;
  @Str("", { notNullable: true }) declare name: string;
  @Str("") declare code2: string;
  @Str("") declare code3: string;
}
