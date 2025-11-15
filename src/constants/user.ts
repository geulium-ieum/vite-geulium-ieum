import * as v from 'valibot';

export const UserSchema = v.object({
    id: v.number(),
    email: v.string(),
    name: v.string(),
    phone: v.string(),
    role: v.picklist(['USER', 'ADMIN', 'SUPER_ADMIN']),
    isActive: v.boolean(),
});
