import React from "react"
function RegisterUser(props) {
    return (
        <div className="userinfo">
            <h2>New User Registration</h2>
            <form onSubmit={props.handleRegister}>
                <input required
                    type="text"
                    value={props.state.fname}
                    name="fname"
                    onChange={props.handleChange}
                    placeholder="First name"
                /><br /><br />
                <input required
                    type="text"
                    value={props.state.lname}
                    name="lname"
                    onChange={props.handleChange}
                    placeholder="Last name"
                /><br /><br />
                <input required
                    tyspe="email"
                    value={props.state.email}
                    name="email"
                    onChange={props.handleChange}
                    placeholder="Email"
                /><br /><br />
                <button type="submit">Register</button>
                <button className="back" onClick={() => props.handleBack("Login")}>Back</button>
            </form>
        </div>
    )
}
export default RegisterUser