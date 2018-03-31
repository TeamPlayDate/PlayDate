module.exports = function(sequelize, DataTypes) {
	var user = sequelize.define("user",{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  
	  name: {
	  type: DataTypes.STRING
	  
	  },
    
    email: {
      type: DataTypes.STRING,
      required: true
    },
    emailVerified:{
      type: DataTypes.boolean,
      defaultValue: false
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
  		},
    },

    password: {
      type: DataTypes.STRING,
      required: true
    }
  	

    },{
      timestamps: false 

  });
  
  user.associate = function(models){
      user.hasMany(models.user_interest_relationship);
  };

	return user;

};