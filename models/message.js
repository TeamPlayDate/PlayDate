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
      },

      sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false
      },

      recipient_id: {
      type: DataTypes.INTEGER,
      allowNull: false
      }

    },{
        timestamps: false

      });
   

	return Message;


};