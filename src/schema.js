// 모든 파일 합침 graphql & resolver file
import {makeExecutableSchema} from "graphql-tools";
import {fileLoader, mergeResolvers, mergeTypes} from "merge-graphql-schemas";
import path from "path";

const allTypes = fileLoader(path.join(__dirname,"/api/**/*.graphql"));//모든 GraphQL file 취합
const allResolvers = fileLoader(path.join(__dirname,"/api/**/*.js"));//모든 Resolver file 취합
//api 안에는 graphql과 resolver관련 파일만 필요

const schema = makeExecutableSchema({
    typeDefs: mergeTypes(allTypes),
    resolvers: mergeResolvers(allResolvers)
});

export default schema;