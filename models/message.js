module.exports = function(sequelize, DataTypes) {
	var message = sequelize.define("message",{

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
      },

      senderId: {
      type: DataTypes.STRING,
      allowNull: false
      },

      recipientId: {
      type: DataTypes.STRING,
      allowNull: false
      }

    },{
        timestamps: false

      });
   message.associate = function(models){
      message.belongsTo(models.user, {as: "sender"});
      message.belongsTo(models.user, {as: "recipient"});
   }

	return message;


};