import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AdminProjectBids = () => {
  const params = useParams();
  const { id } = params;
  const [bids, setBids] = useState([]);
  const getBidsById = async () => {
    try {
      const response = await fetch(`/api/project/bid/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setBids(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBidsById();
  }, []);

  const handleChange = async (bidId, value) => {
    try {
      const response = await fetch(`/api/admin/update/${bidId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: value }),
      });
      const data = await response.json();
      console.log(data);
      getBidsById();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-center text-[3rem] text-slate-500 font-semibold">
        Bids
      </h1>
      <div className="flex gap-4 flex-col px-5 max-w-[1000px] mx-auto">
        {bids?.map((bid) => {
          return (
            <div
              key={bid._id}
              className="w-full bg-white px-6 py-4 hover:shadow-lg flex justify-between items-center">
              <div>
                <h1>{bid.name}</h1>
                <p>{bid.email}</p>
                <p>{bid.coverLetter}</p>
                <p>{bid.amount}</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div
                  className={`${
                    bid.status === "pending"
                      ? "bg-orange-500"
                      : bid.status === "accepted"
                      ? "bg-green-500"
                      : "bg-red-500"
                  } py-2 px-4 text-white rounded-md`}>
                  {bid.status.slice(0, 1).toUpperCase() + bid.status.slice(1)}
                </div>
                {bid.status === "pending" && (
                  <div className="flex gap-4">
                    <div
                      className="bg-green-500 px-3 py-2 text-white rounded-md cursor-pointer"
                      onClick={() => handleChange(bid._id, "accepted")}>
                      Accept
                    </div>
                    <div
                      className="bg-red-500 px-3 py-2 text-white rounded-md cursor-pointer"
                      onClick={() => handleChange(bid._id, "rejected")}>
                      Reject
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminProjectBids;
