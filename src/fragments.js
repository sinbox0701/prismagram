export const COMMENT_FRAGMENT = `
    fragment CommentParts on Comment{
        id
        text
        user{
            username
        }
    }
`;
//models.graphql에서 복사