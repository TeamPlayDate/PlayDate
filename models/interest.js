module.exports = function(sequelize, DataTypes) {
	var interest = sequelize.define("interest",{
        id: {
        	    type: DataTypes.INTEGER,

        	    allowNull: false,
        	    primaryKey: true
        	},

        name: DataTypes.STRING
        },{
            timestamps: false
        
    });
    
    interest.associate = function(models){
        interest.hasMany(models.user_interest_relationship);
    }
    
	return interest;
};

