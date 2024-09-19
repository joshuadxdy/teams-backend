import {GraphQLScalarType, Kind} from 'graphql';
import {DateTime} from 'luxon';

export const dateScalar = new GraphQLScalarType({
  name: 'scalar DateTime',
  description: 'Date custom scalar types',
  serialize(value) {
    if (value instanceof DateTime) {
      return value.toMillis();
    }
    if (value instanceof Date) {
      return DateTime.fromJSDate(value).toMillis(); // Convert outgoing Date to string
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
    if (typeof value === 'number') {
      return DateTime.fromMillis(value).toJSDate();
    }
    if (typeof value === 'string') {
      return DateTime.fromFormat(value, 'hh:mm:ss').toJSDate();
    }
    if (value instanceof DateTime) return value.toJSDate();
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});
