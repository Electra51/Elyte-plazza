import React from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { CiShoppingTag } from "react-icons/ci";
import { FaDollarSign } from "react-icons/fa";

// import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
const UserDashboard = () => {
  const totalOrder = localStorage.getItem("bookings");

  // const data = [
  //   { name: "Group A", value: 400 },
  //   { name: "Group B", value: 300 },
  //   { name: "Group C", value: 300 },
  //   { name: "Group D", value: 200 },
  // ];
  // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div className="mt-28">
      <div className="grid grid-cols-3 gap-5 max-w-[1080px] mx-auto">
        <div className="bg-base-100 shadow-xl rounded-[4px]">
          <div className="card-body">
            <h2 className="flex justify-between items-center font-bold">
              Total Orders <CiShoppingTag className="text-[18px]" />
            </h2>
            <div className="flex justify-start items-center gap-3">
              <p className="text-3xl font-bold">{totalOrder}</p>{" "}
              <div
                className="radial-progress"
                style={{ "--value": totalOrder }}
                role="progressbar"
              >
                {totalOrder}%
              </div>{" "}
            </div>
            {/* <PieChart width={300} height={400}>
              <Pie
                data={data}
                cx={120}
                cy={200}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart> */}
          </div>
        </div>

        <div className="bg-base-100 shadow-xl rounded-[4px]">
          <div className="card-body">
            <h2 className="flex justify-between items-center font-bold">
              WishList <AiOutlineHeart className="text-[18px]" />
            </h2>
            <div className="flex justify-start items-center gap-3">
              <p className="text-3xl font-bold">5</p>{" "}
              <div
                className="radial-progress"
                style={{ "--value": 70 }}
                role="progressbar"
              >
                70%
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 max-w-[1080px] mx-auto mt-20">
        <div className="bg-base-100 shadow-xl rounded-[4px]">
          <div className="card-body">
            <h2 className="flex justify-between items-center font-bold">
              Payment <FaDollarSign className="text-[18px]" />
            </h2>
            <div className="flex justify-start items-center gap-3">
              <p className="text-3xl font-bold">5</p>{" "}
              <div
                className="radial-progress"
                style={{ "--value": 70 }}
                role="progressbar"
              >
                70%
              </div>{" "}
            </div>
          </div>
        </div>
        <div className="bg-base-100 shadow-xl rounded-[4px] col-span-2">
          <div className="card-body">
            <h2 className="flex justify-between items-center font-bold">
              WishList <AiOutlineHeart className="text-[18px]" />
            </h2>
            <p className="text-3xl font-bold">5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
