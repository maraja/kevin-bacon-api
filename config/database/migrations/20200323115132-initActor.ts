module.exports = {
    up: async (queryInterface, Sequelize) => {
        // actor table
        await queryInterface.createTable("actor", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
            },
            name: Sequelize.DataTypes.TEXT,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable("name");
    },
};
