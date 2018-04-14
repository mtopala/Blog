module.exports = (sequelize, Sequelize)  => {
 
 const User = sequelize.define('User', {

      id: {
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
      },

      username: {
          type: Sequelize.STRING,
          required: true,
          unique: true,
          validate: {
            is: ["^[a-z]+$",'i'],
            len: [5,14]
          }
      },
      password: {
          type: Sequelize.STRING,
          required: true
      }
  });

  User.associate = models => {
    models.User.hasMany(models.Article);
    models.User.hasMany(models.Comment); 
}
return User;

};
