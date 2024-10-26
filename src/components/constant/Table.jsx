import React from "react";
import toast from "react-hot-toast";
import {
    getLocalstorage,
    setLocalStorage,
} from "../../../utils/handleLocalstorage";

export const Table = ({
  tableRowsData,
  setFeedbackMode,
  setFeedback,
  setAllFeedBacks,
}) => {
  const deleteFeedback = (feed) => {
    if (confirm("Sure You Want to Delete This FeedBack.!")) {
      let allFeedBack = [...tableRowsData];
      let filteredFeedBack = allFeedBack?.filter((data) => {
        return data?.id !== feed?.id;
      });

      setLocalStorage("all-feedback", filteredFeedBack);
      setAllFeedBacks(getLocalstorage("all-feedback") || []);
      toast.success("FeedBack Deleted");
    }
  };

  return (
    <>
      {tableRowsData?.length > 0 ? (
        <table>
          <tr>
            <th>ID</th>
            <th>Feedback</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
          {tableRowsData?.map((data, index) => {
            let keys = Object.keys(data);
            return (
              <tr key={index}>
                <td>{data?.id}</td>
                <td>{data?.value}</td>
                <td>{data?.date}</td>
                <div className="table_btn">
                  <button  onClick={() => {
                      setFeedbackMode("view"), setFeedback(data) , toast.success("View Mode Enabled.!")
                    }}>View</button>
                  <button
                    onClick={() => {
                      setFeedbackMode("edit"), setFeedback(data);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteFeedback(data)}>Delete</button>
                </div>
              </tr>
            );
          })}
        </table>
      ) : (
        <div>No Feedback Found</div>
      )}
    </>
  );
};
