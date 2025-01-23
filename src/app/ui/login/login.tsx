import React from "react";

export default function Login() {
    return (
        <div>
            <form>
                <div>
                    <div>ID: </div>
                    <input type="text" placeholder="user id" />
                </div>

                <div>
                    <div>PW: </div>
                    <input type="password" placeholder="********" />
                </div>
                <div>return</div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}