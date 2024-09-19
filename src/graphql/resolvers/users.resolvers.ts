import {GraphQLResolveInfo} from 'graphql/type';
import {Users} from '@/services/users.ts';

export const usersResolvers = {
  Query: {
    users: async () => {},
    user: async (id: string) => {},
  },
  Mutation: {
    login: async () => {},
    userRegistration: async () => {},
    deleteUser: async () => {},
    editUser: async () => {},
  },
};
