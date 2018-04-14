module.exports = (sequelize, Sequelize) => {

    const Category = sequelize.define('Category', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING,
            required: true,
            unique: true,
            validate: {
              len: [5,14]
            }, 
        }
    });
    
    Category.associate = models => {
        models.Category.hasMany(models.Article);
    }
   
    return Category;
}