import React, { useEffect, useState} from "react";
import { getMessage } from "../action/messageAction";
import "bootstrap/dist/css/bootstrap.min.css";
import Switch from "react-switch";
import { Pagination } from "antd";
import {useDispatch, useSelector} from "react-redux"
import Axios from "axios";
import {  useNavigate } from "react-router-dom";

const Odousers = () => {
  const {loading, message}= useSelector(state => state.message)
  const dispatch = useDispatch()
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState("");
  const [page, setPage] = useState(1);
  const [postPerpage, setPostPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const navigate = useNavigate()

 
  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await Axios.get("http://localhost:3001/odoUsers");
      setPosts(data);
      setTotal(data.length);
    };
    fetchPost();
  }, []);

  const handel = async(id) => {
    const { data } = await Axios.post("http://localhost:3001/listtoggle",{
      id:id
    });
      setPosts(data);
  };
  

  const headers = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "code", label: "Code" },
    { key: "contact_email", label: "Contact_Email" },
    { key: "contact_phone", label: "Contact_phone" },
    { key: "created", label: "Created" },
    { key: "unsynced:", label: "Unsynced:" },
    { key: "toggle", label: "Toggle" },
  ];

  // Get Current Posts (Pagination)
  // const indexOfLastPage = page * postPerpage;
  // const indexOfFirstPage = indexOfLastPage - postPerpage;
  // const currentPosts = posts.slice(indexOfFirstPage, indexOfLastPage);

  // const onShowSizeChange = (current, pageSize) => {
  //   setPostPerPage(pageSize);
  // };

  // const itemRender = (current, type, originalElement) => {
  //   if (type === "prev") {
  //     return <a>Previous</a>;
  //   }
  //   if (type === "next") {
  //     return <a>Next</a>;
  //   }
  //   return originalElement;
  // };
  const navi = () => {
    navigate("./cart")
  }

  return (
    <>
    <div className="containers">
      <button onClick={navi}>Cart</button>
      <div className="container-sidebar"></div>
      <div className="container-pages">
        <div className="page-title">
          <h2>VENDERS</h2>
        </div>
        <div className="container-page-top">
          <select
            className="custom-select"
            onChange={(e) => setPostPerPage(e.target.value)}
          >
            <option selected value="10">
              10 / pages
            </option>
            <option value="20">20 / pages</option>
            <option value="30">30 / pages</option>
            <option value="40">40 / pages</option>
          </select>
          <div className="search-input">
            <input
              placeholder="Enter Post Title"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>
        <div></div>
        <center>
          {/* making User tabel */}
          <table className="table table-bordered">
            <thead className="thead-dark ">
              <tr>
                {headers.map((row) => {
                  return <td key={row.key}>{row.label}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {/* putting data on table by map function */}
              {posts.length> 0 && posts
                  .filter((obj) => {
                    if (query == "") {
                      return obj;
                    } else if (
                      obj.name.toLowerCase().includes(query.toLowerCase()) ||
                      obj.created.toLowerCase().includes(query.toLowerCase()) ||
                      obj.contact_email
                        .toLowerCase()
                        .includes(query.toLowerCase())
                    ) {
                      return obj;
                    }
                  })
                  .map((obj, index) => (
                    <tr key={obj.id}>
                      <td >{index + 1}</td>
                      <td>{obj.name}</td>
                      <td>{obj.code}</td>
                      <td>{obj.contact_email}</td>
                      <td>{obj.contact_phone}</td>
                      <td>{obj.created}</td>
                      <td>{obj.unsynced}</td>
                 <td>
                        <Switch
                          onChange={() => handel(obj.id)}
                          checked={obj.status == 0 ? true : false}
                        />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          <div className="conatainer-page-bottom">
            <div className="details">
              <span>
                {" "}
                Showing {page * postPerpage - postPerpage + 1} to{" "}
                {page * postPerpage} of {total} entries
              </span>
            </div>
            {/* <div className="pagination">
              <Pagination
                onChange={(value) => setPage(value)}
                pageSize={postPerpage}
                total={total}
                current={page}
                showSizeChanger
                showQuickJumper
                onShowSizeChange={onShowSizeChange}
                itemRender={itemRender}
              />
            </div> */}
          </div>
        </center>
      </div>
    </div>
    </>
  );
};
export default Odousers;

