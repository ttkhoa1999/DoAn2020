const moment= require('moment') ;
module.exports = (sequelize, DataTypes) => {
    const Topic = sequelize.define('Topic', {
        // Model attributes are defined here
        tenDoAn: {
          type: DataTypes.STRING,
          allowNull: false
        },
        nenTang: {
            type: DataTypes.STRING,
            allowNull: false
            // allowNull defaults to true
          },
        moTa: {
          type: DataTypes.STRING,
          allowNull: false
          // allowNull defaults to true
        },
        ngayNop: {
            type: DataTypes.DATE,
            allowNull: false,
            get: function() {
              return moment(this.getDataValue('ngayNop')).format('DD/MM/YYYY')
           }
        },
        ngDK: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
      }, {
        tableName: 'topics',
    });
    Topic.associate = function(models) {
      Topic.belongsToMany(models.User, {as: 'user', through: 'User_Topic', foreignKey: 'topicId', otherKey: 'userId' });
    }
    

     return Topic;
}