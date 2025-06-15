import pkg from 'mongoose';
const { Schema, model, models } = pkg;
const ArticleSchema = new Schema(
    {
        title : String,
        content : String,
        images : String,
        author : String,
            date: {
                    type: Date,
                    default: Date.now,
            },
        categories: [
            {
                name: String,
                slug: String,
            },
        ],

    },
    { timestamps: true }
);


const Article = model('Article', ArticleSchema);
export default Article;