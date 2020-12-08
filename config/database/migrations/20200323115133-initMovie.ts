module.exports = {
    up: async (queryInterface, Sequelize) => {
        // movie table
        await queryInterface.createTable("movie", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: Sequelize.DataTypes.TEXT,
            actors: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.TEXT),
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable("movie");
    },
};
