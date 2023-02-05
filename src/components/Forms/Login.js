import React from "react"
function Login(props) {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <h2>User Login</h2>
                <input required
                    type="test"
                    value={props.state.username}
                    name="username"
                    onChange={props.handleChange}
                    placeholder="Username"
                /><br /><br />
                <input required
                    type="password"
                    value={props.state.password}
                    name="password"
                    onChange={props.handleChange}
                    placeholder="Password"
                /><br /><br />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default Login