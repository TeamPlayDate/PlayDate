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
  		type: DataTypes.INTEGER,
  		allowNull: true,
  		defaultValue: null,
    	validate: { min: -90, max: 90 }
  		},

  	longitude: {
    	type: DataTypes.INTEGER,
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

  });

	User.associate = function(models){
		User.hasMany(models.User_Interest_Relationship, {as: "interests"});
	};

	return User;

};