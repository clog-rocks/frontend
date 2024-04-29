import type { Grade, RouteMultiselect, RouteTree, Style } from "../logbook.ts";

export type Ascent = {
  readonly id: number;
  readonly date_added: string;
  readonly date_last_edited: string | null;
  readonly repeat: boolean;
  date: string;
  route: number;
  style: number;
  second_go: boolean;
  first_ascent: boolean;
  recommended: boolean;
  quality: number | null;
  comment: string | null;
  personal_grade: number | null;
  personal_grade_flag: PersonalGradeFlag | null;
};

export type CreateAscentRequest = {
  date: string;
  route: number;
  style?: number;
  second_go?: boolean;
  personal_grade_flag?: PersonalGradeFlag;
  first_ascent?: boolean;
  recommended?: boolean;
  quality?: number;
  comment?: string;
  personal_grade?: number;
};

export type PatchAscentRequest = Partial<CreateAscentRequest>;

export type AscentTree = Omit<Ascent, "personal_grade" | "style" | "route"> & {
  style: Style;
  route: RouteTree;
  personal_grade: Grade | null;
};

export type PersonalGradeFlag = "soft" | "hard";

export type AscentForm = Omit<
  PatchAscentRequest,
  "route" | "date" | "personal_grade"
> & {
  route: RouteMultiselect | undefined;
  date: string; // FIXME: Although not required by API form always has date.
  personal_grade: Grade | undefined;
};
