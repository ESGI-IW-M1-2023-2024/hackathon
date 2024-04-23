import { z } from 'zod';

export const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
    case z.ZodIssueCode.invalid_intersection_types:
    case z.ZodIssueCode.invalid_enum_value:
      return { message: 'La saisie du champ est invalide' };

    default:
      return { message: ctx.defaultError };
  }
};
