module.exports = (sequelize, Sequelize) => {

    const Comment = sequelize.define('Comment', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        comment: {
            type: Sequelize.STRING,
            required: true
        }
    });
    
    Comment.associate = models => {
        models.Comment.belongsTo(models.User);
        models.Comment.belongsTo(models.Article); 
    };

    return Comment;
};