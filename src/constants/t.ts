import {z} from 'zod';

export const UserSchema = z.object({
  id: z.string().default(''),
  name: z.string().default('请登录'),
  password: z.string().default(''),
  avatar: z.string().default('https://cctv3.net/i.gif'),
  createTime: z.string().default(() => new Date().toISOString()),
  updateTime: z.string().default(() => new Date().toISOString()),
});

export enum ResetDayModeEnum {
  DAN = 25.8,
  SHUANG = 21.5,
  DAXIAO = 23.65,
}

export const CurrentJobSchema = z.object({
  id: z.string().default(''),
  startTime: z.string().default('09:00'),
  endTime: z.string().default('18:00'),
  salary: z.number().default(12000),
  resetDayMode: z.nativeEnum(ResetDayModeEnum).default(ResetDayModeEnum.SHUANG),
});

export type User = z.infer<typeof UserSchema>;
export type CurrentJob = z.infer<typeof CurrentJobSchema>;
