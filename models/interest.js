module.exports = function(sequelize, DataTypes) {
	var Interest = sequelize.define("Interest",{
        id: {
        	    type: DataTypes.INTEGER,

        	    allowNull: false,
        	    primaryKey: true
        	},

        name: DataTypes.STRING
        },{
            timestamps: false
        
    });

    
	return Interest;
};

