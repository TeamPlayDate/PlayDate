module.exports = function(sequelize, DataTypes) {
	var Interest = sequelize.define("Interest",{
        id: {
        	    type: DataTypes.INTEGER,
        	    allowNull: false
        	}
        name: DataTypes.STRING
	});

	return Interest;


};