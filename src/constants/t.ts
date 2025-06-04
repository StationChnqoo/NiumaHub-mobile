import {z} from 'zod';

export const UserSchema = z.object({
  id: z.string().default(''),
  name: z.string().default('请登录'),
  password: z.string().default(''),
  avatar: z.string().default('https://cctv3.net/i.gif'),
  createTime: z.string().default(() => new Date().toISOString()),
  updateTime: z.string().default(() => new Date().toISOString()),
});

export type User = z.infer<typeof UserSchema>;
