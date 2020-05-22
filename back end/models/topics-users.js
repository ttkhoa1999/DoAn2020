module.exports = (sequelize, DataTypes) => {
    const UserTopic = sequelize.define('User_Topic', {
        // Model attributes are defined here
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        topicId: {
            type: DataTypes.INTEGER,
            allowNull: false
            // allowNull defaults to true
          },

      }, {
        tableName: 'users_topics',
    });

     return UserTopic;
}