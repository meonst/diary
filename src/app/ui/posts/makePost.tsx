import React from 'react'

export default function makePost() 
{

    return (
        <div>
            <form>
                <input type="text" />
                <input type="file" />
                <div>category text field?</div>
                <button type="submit">post</button>
            </form>
        </div>
    )
}