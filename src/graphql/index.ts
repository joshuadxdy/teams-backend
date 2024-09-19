import {readFileSync} from 'fs';
import {join} from 'path';

import {usersResolvers} from '@/graphql/resolvers/users.resolvers.ts';

const readUsers = readFileSync(join(__dirname, './typeDefs/users.graphql'), {
  encoding: 'utf-8',
});
const readTeams = readFileSync(join(__dirname, './typeDefs/teams.graphql'), {
  encoding: 'utf-8',
});
const readProjects = readFileSync(
  join(__dirname, './typeDefs/projects.graphql'),
  {encoding: 'utf-8'}
);
const readTasks = readFileSync(join(__dirname, './typeDefs/tasks.graphql'), {
  encoding: 'utf-8',
});

export const typeDefs = `
     ${readUsers}
     ${readProjects}
     ${readTasks}
     ${readTeams}
`;

export const resolvers = {
  ...usersResolvers,
};
