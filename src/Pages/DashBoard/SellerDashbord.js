import React from 'react'
import { FaDollarSign, FaUserPlus } from 'react-icons/fa';
import { MdOutlineReportProblem, MdPreview } from 'react-icons/md';

const SellerDashbord = () => {
    const totalMyProduct = localStorage.getItem("AddProductsForUser");
    return (
        <div className="mt-28">
            <div className="grid grid-cols-3 gap-5 max-w-[1080px] mx-auto">
                <div className="bg-base-100 shadow-xl rounded-[4px]">
                    <div className="card-body">
                        <h2 className="flex justify-between items-center font-bold">
                            Total Product <MdPreview className="text-[18px]" />
                        </h2>
                        <div className="flex justify-start items-center gap-3">
                            <p className="text-3xl font-bold">{totalMyProduct}</p>{" "}
                            <div
                                className="radial-progress"
                                style={{ "--value": totalMyProduct }}
                                role="progressbar"
                            >
                                {totalMyProduct}%
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
                            Total Reported Item{" "}
                            <MdOutlineReportProblem className="text-[18px]" />
                        </h2>
                        <div className="flex justify-start items-center gap-3">
                            <p className="text-3xl font-bold">5</p>{" "}
                            <div
                                className="radial-progress"
                                style={{ "--value": 5 }}
                                role="progressbar"
                            >
                                5%
                            </div>{" "}
                        </div>
                    </div>
                </div>

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
            </div>

        </div>
    )
}

export default SellerDashbord