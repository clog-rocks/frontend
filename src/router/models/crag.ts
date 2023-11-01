import { Model } from "pinia-orm";
import { HasOne, Str } from "pinia-orm/decorators";

import Country from "@/models/country";

class Crag extends Model {
  static entity = "crags";

  @Num() declare id: number;
  @Str("") declare name: string;
  @HasOne(() => Country, "id") declare country: Country;
}
