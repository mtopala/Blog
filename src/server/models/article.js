module.exports = (sequelize, Sequelize) => {

    const Article = sequelize.define('Article', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.STRING,
            required: true,
            unique: true
        },
        content: {
            type: Sequelize.STRING,
            required: true
        }
    });
    
    Article.associate = models => {
       models.Article.belongsTo(models.User);
       models.Article.belongsTo(models.Category); 
    };

    return Article;
};