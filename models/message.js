module.exports = function(sequelize, DataTypes) {
	var Message = sequelize.define("Message",{

      id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           autoIncrement: true,
           primaryKey: true
      },

      title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:  {
          len: [1]
          }
      },
    
      body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
        }
      }

      });
	
    Message.associate = function(models){

	    Message.belongsTo(models.User,{as:'Sender',foreignKey:"user_id"});
	    Message.belongsTo(models.User,{as:'Recipient',foreignKey:"user_id"})

    };

	return Message;


};