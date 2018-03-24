module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User",{
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  
	user_name: {
	  type: DataTypes.STRING,
	  required: true
	},

  	latitude: {
  		type: Sequelize.INTEGER,
  		allowNull: true,
  		defaultValue: null,
    	validate: { min: -90, max: 90 }
  		},

  	longitude: {
    	type: Sequelize.INTEGER,
    	allowNull: true,
    	defaultValue: null,
    	validate: { min: -180, max: 180 }
  		},

  	picture: {
  		type: DataTypes.STRING,
  		allowNull: false,
  		validate: {
  			len: [1]
  		}
  	},

  	interests: {
  		type: DataTypes.STRING,
  		allowNull: false,
  		validate: [1]
  	}
  });

	return User;
};