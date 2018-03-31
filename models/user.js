module.exports = function(sequelize, DataTypes) {
	var user = sequelize.define("user",{
    id: {
      type: DataTypes.STRING,
      primaryKey: true,

    },
  
	  name: {
	  type: DataTypes.STRING
	  
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
    }

    },{
      timestamps: false 

  });
  
  user.associate = function(models){
      user.hasMany(models.user_interest_relationship);
  };

	return user;

};