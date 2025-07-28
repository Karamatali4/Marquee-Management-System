import React, { useEffect } from 'react'

export default function staffIndex() {
    useEffect(() =>{
const role = localStorage.getItem("role");
if(role !== "staff"){
    window.location.href = "/login"
}
    },[]);
  return (<>
    <div className="text-amber-950">staff index page</div>
  </>
  );
}

