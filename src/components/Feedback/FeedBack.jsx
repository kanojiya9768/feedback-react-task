import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    getLocalstorage,
    setLocalStorage,
} from "../../../utils/handleLocalstorage";
import { Table } from "../constant/Table";

export const FeedBack = () => {
  //logged in user details
  const userName = getLocalstorage("LoggedInUser") || {};

  //feedback actions mode , view , add , edit
  const [feedbackMode, setFeedbackMode] = useState("add");

  //all added feedbacks
  const [allFeedBacks, setAllFeedBacks] = useState([]);

  //current feedback
  const [feedBack, setfeedBack] = useState({
    id: Date.now(),
    date: "",
    value: "",
    username: "",
    type: "",
  });

  //get user role wise feedback if user then retrieve perticular users feedback otherwise everything (all users data to show to admin)
  let getUserWiseFeedBack = () => {
    let allFeedBack = getLocalstorage("all-feedback");
    setAllFeedBacks(
      allFeedBack
        ? allFeedBack?.filter((data) =>
            userName?.type === "user"
              ? data?.username === userName?.username
              : data
          )
        : []
    );
  };

  useEffect(() => {
    getUserWiseFeedBack();
  }, []);

  //handle change for feedback form input
  const handleChange = (e) => {
    let { value } = e.target;
    setfeedBack({
      ...feedBack,
      value: value,
    });
  };

  //handle submit for performing action of edit , and add
  const handleSubmit = () => {
    if (feedBack?.value?.length > 0) {
      let allFeedBacks = getLocalstorage("all-feedback") || [];
      if (allFeedBacks?.some((data) => data?.id == feedBack?.id)) {
        let allFeed = [...allFeedBacks];
        allFeed[allFeedBacks?.findIndex((data) => data?.id === feedBack?.id)] =
          {
            ...feedBack,
            date: new Date().toLocaleString(),
            username: userName?.username,
            type: userName?.type,
          };
        setLocalStorage("all-feedback", allFeed);
        getUserWiseFeedBack();
        toast.success("Feedback Updated.!");
        setfeedBack({
          id: Date.now(),
          value: "",
        });
      } else {
        let allfeed = [...allFeedBacks];
        allfeed?.push({
          ...feedBack,
          date: new Date().toLocaleString(),
          username: userName?.username,
          type: userName?.type,
        });
        setLocalStorage("all-feedback", allfeed);
        getUserWiseFeedBack();
        toast.success("Feedback Submitted.!");
        setfeedBack({
          id: Date.now(),
          value: "",
        });
      }
    } else {
      toast.error("FeedBack is Required.! write something.");
    }
  };

  //logout funtion for sign out
  const Logout = () => {
    setLocalStorage("LoggedInUser", null);
    location.reload();
  };

  return (
    <div className="feedback_container">
      <div className="feedback_form">
        <p className="feedback_heading">Feedback</p>
        <div className="feedback_btn_container">
          <button
            type="button"
            style={{ border: feedbackMode == "add" && "2px solid black" }}
            onClick={() => {
              setFeedbackMode("add"),
                setfeedBack({
                  id: Date.now(),
                  date: "",
                  value: "",
                });
            }}
          >
            Add Feedback
          </button>

          {feedbackMode == "edit" ? (
            <button
              type="button"
              style={{ border: feedbackMode == "edit" && "2px solid black" }}
              onClick={() => setFeedbackMode("edit")}
            >
              edit Feedback
            </button>
          ) : (
            <button
              disabled
              type="button"
              style={{ border: feedbackMode == "edit" && "2px solid black" }}
              onClick={() => setFeedbackMode("edit")}
            >
              edit Feedback
            </button>
          )}
        </div>

        <div className="feedback_input_container">
          <p>Your Feedback</p>
          {feedbackMode === "view" ? (
            <textarea
              name="feedback"
              id="feedback"
              value={feedBack?.value}
              placeholder="write your feedback here..."
              onChange={handleChange}
              disabled
            ></textarea>
          ) : (
            <textarea
              name="feedback"
              id="feedback"
              value={feedBack?.value}
              placeholder="write your feedback here..."
              onChange={handleChange}
            ></textarea>
          )}
        </div>
        {feedbackMode == "view" ? (
          <button
            type="submit"
            onClick={handleSubmit}
            disabled
            className="feedback_submit_btn"
          >
            Submit
          </button>
        ) : (
          <button
            type="submit"
            onClick={handleSubmit}
            className="feedback_submit_btn"
          >
            Submit
          </button>
        )}
      </div>

      {/* feedBackListing Table */}
      <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
        <h3 style={{ marginBottom: "15px" }}>
          {userName?.type == "user"
            ? "My FeedBacks"
            : "Admin Feedback Dashboard"}
        </h3>
        <Table
          tableRowsData={allFeedBacks}
          setFeedbackMode={setFeedbackMode}
          setFeedback={setfeedBack}
          setAllFeedBacks={setAllFeedBacks}
        />
      </div>

      <button className="logout_btn" onClick={Logout}>
        Logout
      </button>
    </div>
  );
};
