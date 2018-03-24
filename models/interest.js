var interests = require('../db/interests.js')
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

for (var i = 0; i < interests.length; i++)
{

	Interest.create(interests[i].id,interests[i].name);
}

