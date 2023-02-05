import React from "react"
import axios from 'axios'
import Login from "./Login"
import RegisterUser from "./RegisterUser"
import UserInfo from "./UserInfo"
import file from "../../docs/Limerick.txt"

class Form extends React.Component {
    constructor() {
        super()
        this.initialState = {
            username: "",
            password: "",
            fname: "",
            lname: "",
            email: "",
            mode: "Login",
            file: "",
            count: 0
        }
        this.state = this.initialState;
        this.createUser = this.createUser.bind(this)
        this.clearState = this.clearState.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleMode = this.handleMode.bind(this)
        this.retriveInfo = this.retriveInfo.bind(this)
        this.currentHost = `${window.location.protocol}//${window.location.hostname}`
        this.readFile = this.readFile.bind(this)
    }

    handleBack(modeCurrent) {
        this.clearState();
        this.handleMode(modeCurrent);
    }

    handleChange(event) {
        const { name, value, type, checked } = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({
            [name]: value
        })
    }

    handleMode(modeCurrent) {
        this.setState({ mode: modeCurrent });
    }

    handleRegister(event) {
        event.preventDefault();
        this.readFile();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.retriveInfo();
    }

    clearState = () => {
        this.setState({ ...this.initialState });
    }

    readFile() {
        fetch(file)
            .then(r => {
                this.setState({ file: r.url })
                return r.text()
            })
            .then(text => {
                var arr = text.split(new RegExp([" ", "\n"].join('|'), 'g'));
                this.setState({ count: arr.length }, () => {
                    this.createUser();
                    this.clearState();
                    this.handleMode("Login");
                })
            })
    }

    createUser() {

        axios
            .post(`${this.currentHost}:5001/users/create`, {
                username: this.state.username,
                password: this.state.password,
                fname: this.state.fname,
                lname: this.state.lname,
                email: this.state.email,
                file: this.state.file,
                count: this.state.count
            })
            .then(res => {
                console.log(res.data)
            })
            .catch(error => console.error(`Error: ${error}`))
    }

    retriveInfo() {
        axios
            .put(`${this.currentHost}:5001/users/check`, {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                if (response.data.length > 0) {
                    let info = response.data[0];
                    if (response.data[0].password === this.state.password) {
                        this.handleMode("Info");
                        this.setState({ fname: info.fname, lname: info.lname, email: info.email, count: info.count, file: info.file });
                    } else alert("Invalid password");

                } else this.handleMode("Register");
            })
            .catch(error => console.error(`User list unavialable: ${error}`))

    }

    render() {
        return (
            <div className="container">
                {this.state.mode === "Login" ? <Login
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    state={this.state}
                /> : (this.state.mode === "Register" ? <RegisterUser
                    handleChange={this.handleChange}
                    handleRegister={this.handleRegister}
                    handleBack={this.handleBack}
                    state={this.state}
                /> : <UserInfo
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    handleBack={this.handleBack}
                    state={this.state}
                />)}
            </div>
        )
    }
}
export default Form