import React,{useState, useEffect,useContext} from 'react'
import { useSelector } from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Cart = () => {
 const [posts, setPosts] = useState([]);

 useEffect(() => {
  const fetchPost = async () => {
    const { data } = await axios.get("http://localhost:3001/card");
    setPosts(data);
  };
  fetchPost();
}, []);
console.log(posts);

    return(
      <>
   {posts.map((el) =>(
         <div class="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card h-100">
              <img src={el.thumbnail} width={250} height={250} className="card-img-top" alt={el.medianame}/>
              <div className="card-body">
                <h5 className="card-title">{el.medianame}</h5>
                <p className="card-text">{el.areadescription}</p>
                <p className="card-text">{el.Lateststatus}</p> 
                 <p className="card-text">"Not Avalible"</p>
              </div>
            </div>
          </div>
    </div>
   ))}
  </>
  )
    }

export default Cart
