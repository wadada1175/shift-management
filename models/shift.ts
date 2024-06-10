import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface ShiftAttributes {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

interface ShiftCreationAttributes extends Optional<ShiftAttributes, "id"> {}

export default (sequelize: Sequelize) => {
  class Shift
    extends Model<ShiftAttributes, ShiftCreationAttributes>
    implements ShiftAttributes
  {
    public id!: number;
    public date!: string;
    public startTime!: string;
    public endTime!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

  Shift.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Shift",
    }
  );

  return Shift;
};
