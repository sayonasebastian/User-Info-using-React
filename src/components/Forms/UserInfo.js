import React from "react"
function UserInfo(props) {
    return (
        <div>
            <h2>User Information</h2>
            <h3>First Name : {props.state.fname}</h3>
            <h3>Last Name : {props.state.lname}</h3>
            <h3>Email : {props.state.email}</h3>
            <div className="fileDownload">
            <a href={props.state.file} download> Download file with word count : {props.state.count}</a>
            </div>
            <br></br>
            <button onClick={() => props.handleBack("Login")}>Back</button>
        </div>
    )
}
export default UserInfo