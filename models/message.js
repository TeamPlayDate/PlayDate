module.exports = function(sequelize, DataTypes) {
	var Message = sequelize.define("Message",{
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
	    Message.belongsTo(models.User,{as:'Sender',foreignKey:"senderId"});
	    Message.belongsTo(models.User,{as:'Recipient',foreignKey:"recipientId"})
    };

	return Message;


};